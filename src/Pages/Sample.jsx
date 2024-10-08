import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CenterBox from '../Components/SideBox/CenterBox';
import '../Styles/Sample.css'
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Box, Stack, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { MdPeopleOutline } from "react-icons/md";
import { RiErrorWarningLine } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { HiDotsVertical } from "react-icons/hi";
import Img from '../assets/noItemFound.webp'
import Nodata from '../assets/nodata.svg'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  marginTop: '17px',
  marginRight: '5px',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


const Sample = () => {
  const [sidecondition, setsidecondition] = useState(false)
  const [goals, setGoals] = useState([])
  const fetchGoals = async () => {
    try{
      const response = await axios.get('http://localhost:8081/goal/')
      if(response.status === 200) setGoals(response.data)
      console.log(goals)
      
    } catch (error){
      console.log("error while fetching data", error);
    }
  };

  useEffect(() => {
    fetchGoals();
}, []);

  return (
    <div className='sam-background'>
      {/* <li onClick={()=>{setsidecondition(true)}}>X</li>
        <CenterBox opencondition={sidecondition} setopencondition={setsidecondition}/> */}
      <Stack direction='row'>
        <Box flex={4}>
          <Typography variant='p' sx={{ fontSize: '19px', fontWeight: 500 }}>Goals (4)</Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: '15px', marginTop: '10px' }}>
            <MdPeopleOutline size={22} />
            <MdPeopleOutline size={22} />
            <MdPeopleOutline size={22} />
            <MdPeopleOutline size={22} />
            <MdPeopleOutline size={22} />
            <MdPeopleOutline size={22} />
          </Box>
          <Box>
            {goals.map((item, index) => (
            <Box bgcolor='white' mb={2} sx={{ borderRadius: '9px', padding: '10px', border: '1px solid #BDBDBD' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }} >
                <Box>
                  <Typography sx={{ fontSize: '18px', fontWeight: 500 }}>{item.goal_title}</Typography></Box>
                <Box sx={{ display: 'flex', gap: '15px', alignItems: 'center' }} >
                  <RiErrorWarningLine size={22} />
                  <FaRegStar size={22} />
                  <HiDotsVertical size={22} />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center', color: '#6d6f6c', fontWeight: 500 }} mt={1} >
                <Typography>45036 - Phase</Typography>
                <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                  <GoDotFill />
                  <Typography>{item.hashtag.name}</Typography>
                </Box>
              </Box>
              <Box mt={2} sx={{ display: 'flex', gap: '5px', alignItems: 'center', borderRadius: '40px', width: 'fit-content', backgroundColor: '#FFF2F2', padding:'4px' }}>
                <Box sx={{ border: '2px solid #95A5A6', borderRadius: '50%', width: 'fit-content', padding: '3px', height:'33px', width:'33px', alignItems:'center' }}>
                  <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>33%</Typography>
                </Box>
                <Typography sx={{ fontSize: '17px', fontWeight: 400, marginRight: '4px', color: '#E74C3C' }}>At Risk</Typography>
              </Box>
            </Box>
            ))}
          </Box>
        </Box>
        <Box
          flex={8}
          sx={{
            display: 'flex',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            fontSize: '18px',
            textAlign: 'center'
          }}
        >
          <Box>
            <img src={Nodata} alt='No items found' style={{ marginBottom: '1px', width: '30rem', height: '30rem' }} />
            <h4>No Items Found</h4>
          </Box>
        </Box>

      </Stack>

    </div>
  );
}

export default Sample;
