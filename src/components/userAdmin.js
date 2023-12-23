import React, {useState, useEffect} from 'react'
import Classes from './userAdmin.module.css'
import { LinearProgress, CircularProgress } from '@mui/material'

export default function SuperAdmin() {

    const [data, setJoinedData] = useState([]);
    const [filterData, setFilterData]=useState([])
    const [selectedUuid, setSelectedUuid]=useState([])
    const [searchValue, setSearchValue] = useState('');
    const [searchedData, setSearchedData]=useState([])

    useEffect(() => {
        fetch('http://15.207.60.255:5000/monitorraw', {
            method:'GET',
            mode:'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        })
          .then((response) => response.json())
          .then((data) => {
            setJoinedData(data.data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    }, []);

    const handleManage=()=>{
        const filteredData=data.filter(item=>item.open_qty!=0)
        setFilterData(filteredData)
    }

    useEffect(() => {

        if (filterData.length === 0) {
            document.getElementById('tableCont2').style.display = 'none';
            document.getElementById('tableCont1').style.display = 'block';
        } else {
            document.getElementById('tableCont1').style.display = 'none';
            document.getElementById('tableCont2').style.display = 'block';
        }
    }, [filterData]);
    

    const handleTableExit=()=>{
        setFilterData([])
        console.log(selectedUuid)
        console.log(selectedUuid.length)
        setSelectedUuid([])
        
    }

    const handleRadioChange=(index)=>{
        setSelectedUuid([...selectedUuid, filterData[index]])
    }

    const exitOpenSelectedOrder=(index)=>{
        console.log()
    }

    const remediate=(index)=>{
        console.log("")
    }

    const handleSearch = (e, whichData) => {
        const value = e.target.value;
        setSearchValue(value);

        if(whichData==="filterData"){
            const filteredUsers = filterData.filter((user) => {
                return (
                    user.uuid.toLowerCase().includes(value)||
                    user.symbol.toLowerCase().includes(value)
                );
              });
          
              setSearchedData(filteredUsers);
              if(value.length===0){
                document.getElementById('table3').style.display='none'
                document.getElementById('table1').style.display='block'
              }else{
                document.getElementById('table1').style.display='none'
                document.getElementById('table3').style.display='block'
              }
        }else{
            const filteredUsers = data.filter((user) => {
                return (
                  user.uuid.toLowerCase().includes(value)||
                  user.symbol.toLowerCase().includes(value)
                );
              });
          
              setSearchedData(filteredUsers);
              if(value.length===0){
                document.getElementById('table3').style.display='none'
                document.getElementById('table1').style.display='block'
              }else{
                document.getElementById('table1').style.display='none'
                document.getElementById('table3').style.display='flex'
              }
        }
    
        
  
    }


 
  return (
    <div>
        <div className={Classes.container}>
            <div className="cont1" style={{display:"flex", justifyContent:'space-between', margin:'1rem', marginBottom:'0'}}>
                <div className="">
                    <div className="" style={{backgroundColor:"white", width:"12.5rem", height:"10rem", marginBottom:'0.5rem'}}>
                        <h5 style={{marginTop:'0', paddingTop:'0'}}>Active-Users</h5>
                        <div className="" style={{display:'flex', justifyContent:"center", alignItems:"center"}}>
                            <h2>Hello</h2>
                        </div>
                    </div>

                    <div className="" style={{backgroundColor:"white", width:"12.5rem", height:"10rem"}}>
                        <h5 style={{marginTop:'0', paddingTop:'0'}}>Todays-Order</h5>
                        <div className="" style={{display:'flex', justifyContent:"center", alignItems:"center"}}>
                            <h2>Hello</h2>
                        </div>
                    </div>
                </div>

                <div className="" style={{backgroundColor:"white", width:'37.25rem', height:"20.5rem"}}>
                    <h5 style={{marginTop:'0', paddingTop:'0'}}>num_order_time</h5>
                    <div className="" style={{display:'flex', justifyContent:"center", alignItems:"center"}}>
                        <h2>Hello</h2>
                    </div>
                </div>
                <div className="" style={{backgroundColor:"white", width:'37.25rem', height:"20.5rem"}}></div>
            </div>

            <div className="cont2" style={{backgroundColor:"white", width:'88rem', height:"22rem", margin:'1rem', marginBottom:'0', marginTop:'0.5rem'}}></div>

            <div className="cont3" style={{display:'flex', justifyContent:"space-between", margin:'0.5rem 1rem', marginBottom:'0'}}>
                <div className="" style={{backgroundColor:"white", width:'43.7rem', height:"30rem"}}></div>
                <div className="" style={{backgroundColor:"white", width:'43.7rem', height:"30rem"}}></div>
            </div>

            <div className="cont4" style={{backgroundColor:"white", margin:'1rem', marginTop:'0.5rem'}} id='tableCont1'>
                <h5>User-position-Insights</h5>
                <button style={{margin:"0 2rem"}} onClick={handleManage}>Manage</button>
                <div className={Classes.searchBar}style={{margin:"0 2rem"}}>
                    <label htmlFor="Search">Search: </label>
                    <input type="text"name="userSearchBar"id="userSearchBar"placeholder='Search Bar:  Enter the name of the Client Code'value={searchValue}onChange={(e) => handleSearch(e, "")}/>
                </div>
                <div className={Classes.tableContainer} id='table1' style={{margin:"0rem 2rem", display:"flex", flexDirection:"column"}}>
                
                    {
                        data.length===0?(<div style={{display:"flex", justifyContent:"center", flexDirection:'column', alignItems:"center"}}><CircularProgress sx={{width:'100%'}}/></div>):(
                            <>
                            
                            <table className={Classes.userTable}>
                                <thead>
                                <tr>
                                    <th>User Id</th>
                                    <th>Order qty</th>
                                    <th>Open Quantity</th>
                                    <th>Average MTM</th>
                                    <th>Symbol</th>
                                    <th>Buy Avg</th>
                                    <th>Sell Avg</th>
                                    <th>Token</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.uuid}</td>
                                        <td>{item.qty}</td>
                                        <td>{item.open_qty}</td>
                                        <td>{item.mtm}</td>
                                        <td>{item.symbol}</td>
                                        <td>{item.buy_avg}</td>
                                        <td>{item.sell_avg}</td>
                                        <td>{item.token}</td>
                                        <td><button onClick={()=>exitOpenSelectedOrder(index)}>Exit Open Order</button> <button onClick={()=>remediate(index)}>Remediate</button></td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            </>
                        )
                    }
                    
                </div>  

                <div className={Classes.tableContainer} id='table3' style={{margin:"0rem 2rem", display:"none", flexDirection:"column"}}>
                
                    {
                        data.length===0?(<div style={{display:"flex", justifyContent:"center", flexDirection:'column', alignItems:"center"}}><CircularProgress sx={{width:'100%'}}/></div>):(
                            <>
                            <table className={Classes.userTable}>
                                <thead>
                                <tr>
                                    <th>User Id</th>
                                    <th>Order qty</th>
                                    <th>Open Quantity</th>
                                    <th>Average MTM</th>
                                    <th>Symbol</th>
                                    <th>Buy Avg</th>
                                    <th>Sell Avg</th>
                                    <th>Token</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {searchedData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.uuid}</td>
                                        <td>{item.qty}</td>
                                        <td>{item.open_qty}</td>
                                        <td>{item.mtm}</td>
                                        <td>{item.symbol}</td>
                                        <td>{item.buy_avg}</td>
                                        <td>{item.sell_avg}</td>
                                        <td>{item.token}</td>
                                        <td><button onClick={()=>exitOpenSelectedOrder(index)}>Exit Open Order</button> <button onClick={()=>remediate(index)}>Remediate</button></td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            </>
                        )
                    }
                    
                </div> 
            </div>

            <div className="cont4" style={{backgroundColor:"white", margin:'1rem', marginTop:'0.5rem', display:"none"}} id='tableCont2'>
                <h5>User-position-Insights</h5>
                <button style={{margin:"0 2rem"}} onClick={handleTableExit}>Exit</button> 
                <div className={Classes.tableContainer} id='table2' style={{margin:"0rem 2rem", display:"flex", flexDirection:"column"}}>
                
                    <table className={Classes.userTable}>
                        <thead>
                        <tr>
                            <th>Select</th>
                            <th>User Id</th>
                            <th>Order qty</th>
                            <th>Open Quantity</th>
                            <th>Average MTM</th>
                            <th>Symbol</th>
                            <th>Buy Avg</th>
                            <th>Sell Avg</th>
                            <th>Token</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filterData.map((item, index) => (
                            <tr key={index}>
                                <td><input type="radio" onChange={() => handleRadioChange(index)}/></td>
                                <td>{item.uuid}</td>
                                <td>{item.qty}</td>
                                <td>{item.open_qty}</td>
                                <td>{item.mtm}</td>
                                <td>{item.symbol}</td>
                                <td>{item.buy_avg}</td>
                                <td>{item.sell_avg}</td>
                                <td>{item.token}</td>
                                <td><button onClick={()=>exitOpenSelectedOrder(index)}>Exit Open Order</button> <button onClick={()=>remediate(index)}>Remediate</button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}
