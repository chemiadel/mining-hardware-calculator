import {useEffect, useState} from 'react'
import Head from 'next/head'
import { NextPage, GetStaticProps} from 'next'
import { useForm } from "react-hook-form";

export const getStaticProps: GetStaticProps = async () => {
  try{
      
      const curr=await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${process.env.ssID}/values/Final!A2:F?majorDimension=ROWS&key=${process.env.key}`
      )
        .then((res) => res.json())
        .then(({values}:any)=>{
          return values.map((item : any)=> ({ 
            symbol: item[0], 
            key: item[1],
            price: item[2],
            value: item[3],
            algo: item[4], 
            unit: item[5]
          }))
        })

      const hw=await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${process.env.ssID}/values/Hardware!A2:F?majorDimension=ROWS&key=${process.env.key}`
      )
        .then((res) => res.json())
        .then(({values}:any)=>{
          return values.map((item : any)=> ({ 
              algo: item[0], 
              model: item[1], 
              hashrate: item[2], 
              unit: item[3],
              watt: item[4],
              type: item[5]
            }))
        })

      return {
        props: {
          curr,
          hw
        },
        revalidate: 60,
      };
  } catch(err) {

      console.log( {err})
      return {
        props: {}
      }
  }
}

const Home: NextPage = ({hw, curr}: any) => {
  //Initial states
  const [data, setData] = useState<any>(curr)
  const [hardware, setHardware] = useState(hw)

  //Form states
  const [selected, setSelected] = useState<any>(0)
  const [selectedData, setSelectedData] = useState(curr[0])
  
  if(!data || !hardware) return null
  return ( <div className="flex flex-col space-y-4 "> 
          <title>Hardware Mining Calculator</title>
          <select 
          onChange={(e)=> {
            setSelected(e.currentTarget.value)
            setSelectedData(data[e.currentTarget.value])
          }}
          className="lg:hidden text-lg font-extrabold border rounded-lg px-2 mx-2 py-3 outline-none border-b-4" >
              {data.map((item: any, i:number)=> 
              <option key={item.key} value={i}> 
                {item.key}
              </option>)}
          </select>
          <div className="flex flex-col lg:flex-row ">
          

          <div className="hidden lg:flex flex-col w-1/2 space-y-4 px-2 lg:px-8 py-4 max-h-96 overflow-y-auto">
            {data.map((item: any, i:number)=> <Row index={i} selected={selected} setSelected={setSelected} setSelectedData={setSelectedData} data={item} key={item.key}/>)}
          </div>
          <div className="space-y-2 px-2 lg:px-8 mx-auto">
            <Calculator selectedData={selectedData} hardware={hardware}/>
          </div>
    </div>
    </div>
  )
}

function Row({data, selected, setSelected, setSelectedData, index}: any){

  function handleFocus(){
    setSelected(index)
    setSelectedData(data)
  }

  return <button 
  autoFocus={index===0} 
  onFocus={handleFocus} 
  className={`p-2 px-4 flex flex-row items-center space-x-4 
  rounded-md outline-none ${selected===index?'ring-4 bg-gray-100':''}`}>
  <img className='h-10 w-10' src={`/${data.symbol.toLowerCase()}.png`}/>
  <div className='flex flex-col flex-grow text-left'>
    <h1 className='text-md font-bold'>{data.key}</h1>
    <h2 className='text-xs font-semibold'>{data.algo}</h2>
  </div>
  <div className='text-sm font-semibold'>{new Intl.NumberFormat('us-EN', { style: 'currency', currency: 'USD' }).format(data.price)}</div>
</button>
}


function Calculator({hardware, selectedData}: any){
  const [selected, setSelected]=useState<any>(0)
  const form = useForm();

  //results
  const [income, setIncome] = useState(0)
  const [loss, setLoss] = useState(0)

  if(!selectedData || hardware.length===0) return null

  const hardwareFilter=hardware.filter((item:any)=> item.algo.toLowerCase()===selectedData.algo.toLocaleLowerCase())
  
  // console.log({hardwareFilter, selectedData})
  const onSubmit = (data : any) => {
      console.log({data})
    
      const totalhr=data.qty*hardwareFilter[selected].hashrate

      //income
      const income=(totalhr+data.custom)*selectedData.value*selectedData.price;

      setIncome(income)

      //loss
      const totalWatt=data.qty*(hardwareFilter[selected].watt/1000)*data.kwh*24

      const loss=(totalWatt+parseInt(data.cloud))+(totalhr*selectedData.value*(data.poolfee/100))

      setLoss(loss)
  }

  return <div className='flex flex-col space-y-2'>
    <div className='flex flex-row items-center space-x-2 '>
      <div className="w-1/3 ">
        <select 
        {...form.register('hw')}
        onChange={(e)=>setSelected(e.currentTarget.value)}
        className="w-full text-sm border rounded-lg px-2 py-3 outline-none" >
            {hardwareFilter.map((item:any,i: number)=> <option key={item.model} value={i}>{item.model}</option>)}
        </select>
      </div>
      <div className='w-1/3 flex flex-row items-center justify-evenly'>
      {/* <div className='text-center text-sm'>{hardwareFilter[selected].type}</div> */}
      <div className='text-center text-sm'>
        {`${hardwareFilter[selected].hashrate}\n${hardwareFilter[selected].unit}`}
      </div>
      <div className='text-center text-sm'>
        {`${hardwareFilter[selected].watt}W`}
      </div>
      </div>
      <input 
        {...form.register('qty')}
        defaultValue={1}
        type='number'
        min="0" 
        className="w-1/3 border rounded-lg px-4 py-2 outline-none text-centers" 
        placeholder="Qty"/>
    </div>
    <div className='grid grid-cols-2 gap-4 py-2'>
        <div>
            <label className="px-2 text-sm font-semibold">Custom hashrate </label>
            <input 
                {...form.register('custom')}
                defaultValue={0}
                type='number'
                min="0" 
                className="w-full border rounded-lg px-4 py-2 outline-none" 
                placeholder="Custom hashrate"/>
        </div>
        <div>
            <label className="px-2 text-sm font-semibold">USD per kWh </label>
            <input 
                {...form.register('kwh')}
                type='number'
                min="0"
                defaultValue={0}
                className="w-full border rounded-lg px-4 py-2 outline-none" 
                placeholder="USD per kWh"/>
        </div>
        <div>
            <label className="px-2 text-sm font-semibold">Cloud USD/Day</label>
            <input 
                {...form.register('cloud')}
                type='number'
                min="0" 
                defaultValue={0}
                className="w-full border rounded-lg px-4 py-2 outline-none" 
                placeholder="Cloud USD/Day"/>
        </div>
        <div>
            <label className="px-2 text-sm font-semibold">Pool Fee %</label>
            <input 
                {...form.register('poolfee')}
                type='number'
                min="0" 
                defaultValue={0}
                className="w-full border rounded-lg px-4 py-2 outline-none" 
                placeholder="Pool Fee %"/>
        </div>
    </div>
    <div className='flex flex-row space-x-4'>
        <button onClick={()=>{}} className="w-full rounded-md p-2 font-bold text-lg text-black bg-gray-200 focus:ring-4">Reset</button>
        <button onClick={form.handleSubmit(onSubmit)} className="w-full rounded-md p-2 font-bold text-lg text-white bg-blue-600 focus:ring-4">Calculate</button>
    </div>
    <div className="py-2 space-y-4 font-bold">
      <div className='flex flex-row items-center'>
        <h1 className='w-1/4'></h1>
        <div className='w-1/4'>Income ($)</div>
        <div className='w-1/4'>Loss ($)</div>
        <div className='w-1/4'>Profit ($)</div>
      </div>
      <div className='flex flex-row items-center'>
        <h1 className='w-1/4'>Day</h1>
        <div className='w-1/4'>{(income).toFixed(2)}</div>
        <div className='w-1/4'>{(loss).toFixed(2)}</div>
        <div className={`w-1/4 ${(income-loss)<0 ? "text-red-600":""} ${(income-loss)>0 ? "text-green-600":""} `}>{(income-loss).toFixed(2)}</div>
      </div>
      <div className='flex flex-row items-center'>
        <h1 className='w-1/4'>Week</h1>
        <div className='w-1/4'>{(income*7).toFixed(2)}</div>
        <div className='w-1/4'>{(loss*7).toFixed(2)}</div>
        <div className={`w-1/4 ${(income-loss)<0 ? "text-red-600":""} ${(income-loss)>0 ? "text-green-600":""} `}>{((income-loss)*7).toFixed(2)}</div>
      </div>
      <div className='flex flex-row items-center'>
        <h1 className='w-1/4'>Month</h1>
        <div className='w-1/4'>{(income*30).toFixed(2)}</div>
        <div className='w-1/4'>{(loss*30).toFixed(2)}</div>
        <div className={`w-1/4 ${(income-loss)<0 ? "text-red-600":""} ${(income-loss)>0 ? "text-green-600":""} `}>{((income-loss)*30).toFixed(2)}</div>
      </div>
    </div>
  </div>
}

export default Home


