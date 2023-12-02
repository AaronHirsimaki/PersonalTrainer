import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import { Link, Outlet } from 'react-router-dom';
import { Tab, Tabs } from '@mui/material';
import Training from './components/training';
import Customer from './components/customer';
import Home from './components/home';
import MyCalendar from './components/MyCalendar';

function App() {
  const [count, setCount] = useState(0)

  const [value, setValue] = useState('');

  const handleChange = (_, value) => {
    setValue(value);
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h1>Personal Training</h1>
      <Tabs TabIndicatorProps={{ style: { background: 'black' }, text: 'black' }}
        value={value}
        onChange={handleChange}
        centered={true}
        color="pink"
        style={{ backgroundColor: 'white' }}
        textColor="inherit"
        indicatorColor="black">

        <Tab value="Home"
         label="Home"></Tab>

        <Tab value="Customer"
         label="Customers"></Tab>

        <Tab value="Training"
         label="Trainings"></Tab>

         <Tab value="MyCalendar"
         label="MyCalendar"></Tab>

      </Tabs>
      {value === "Home" && <Home />}
      {value === "Customer" && <Customer />}
      {value === "Training" && <Training />}
      {value === "MyCalendar" && <MyCalendar />}
    </div>
  )
}

export default App
