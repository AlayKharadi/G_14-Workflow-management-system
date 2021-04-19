import {useState} from 'react';
import {Button, Dialog, DialogContent, DialogTitle, IconButton, InputBase, Typography} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import ImageUploadModal from './ImageUploadModal';
import { DELETE_PROJECT } from '../storage/actiontype';
import { userStore } from '../storage/store';

const managers = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 }
];


const useStyles = makeStyles((theme)=>({
    project__title:{
        display:'flex',
        alignItems: 'center'
    },
    title:{
        minWidth:'90%', 
        fontSize:'24px', 
        "&.Mui-focused":{
            backgroundColor: '#f7f7f7',
        }
    },
    project__image:{
        maxHeight:'20%',
        maxWidth:'100%',
    },
    team__assigned:{
        margin: 20,
        fontWeight: '400'
    },
    project__manager:{
        margin:20,
        fontWeight:'400',
    },
    project__description:{
        margin:20,
        fontWeight:'400'
    },
    description:{
        paddingTop: 20, 
        borderRadius:10,
        marginTop: 5,
        "&.Mui-focused":{
            backgroundColor: '#f7f7f7',
            height: 'fit-content',
            padding: 30
        }
    },
    project__deadline:{
        margin:20,
        fontWeight:'400'
    },
    save__button:{
        margin:20
    },
    delete__button:{
        margin:20
    },
    label:{
        fontWeight: '500'
    },
    calendar__container:{
        display:'flex',
        flexWrap:'wrap'
    },
    calendar:{
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width:200
    }
}));
const ProjectModal = ({isOpen, setOpen, title, setTitle, description, setDescription, image, setImage, team, setTeam})=>{
    const classes = useStyles();
    const [tempTitle,setTempTitle] = useState(title);
    const [tempDescription, setTempDescription] = useState(description);
    const [manager, setManager] = useState('');
    const [managerInput, setManagerInput] = useState('');
    const [selectedDate, setSelectedDate] = useState('2021-01-01');
    const [errorTeam, setErrorTeam] = useState(false);
    const [openUpload, setOpenUpload] = useState(false);
    const handleOnChange = (e)=>{
        setTempTitle(e.target.value);
    }
    const handleDescriptionChange = (e)=>{
        setTempDescription(e.target.value);
    }
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };
    const handleTeamChange = (e)=>{
        setTeam(e.target.value);
        if(e.target.value <=0 || !e.target.value){
            setErrorTeam(true);
        }
        else
        setErrorTeam(false);
    }
    const handleSave = (e)=>{
        setTitle(tempTitle);
        setDescription(tempDescription);
        if(errorTeam || !team)
        {
            setErrorTeam(true);
        }
        else
        setOpen(false);
    }
    return(
        <>
        <ImageUploadModal openUpload={openUpload} setOpenUpload={setOpenUpload}></ImageUploadModal>
           <Dialog open={isOpen} className={classes.dialog__container} onClose={()=>setOpen(false)}>
                <DialogTitle id='simple-dialog-title'>
                    <div className={classes.project__title}>
                        <Typography variant = {'h5'} component={'h2'} style = {{flex:1, alignItems: 'center'}}>
                            <InputBase value={tempTitle} onChange={handleOnChange} className={classes.title}></InputBase>
                        </Typography>
                        <IconButton onClick = {()=>setOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent dividers={true}>
                <div>
                    <img src={image}
                    alt="project-image" 
                    className={classes.project__image} onClick={()=>setOpenUpload(true)}/>
                </div>
                <div className = {classes.team__assigned}>
                    <TextField
                        id="standard-number"
                        label="Team Assigned"
                        type="number"
                        value = {team}
                        onChange={handleTeamChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={errorTeam}
                    />
                </div>
                <div className = {classes.project__manager}>
                    <Autocomplete
                    onChange={(e, newValue)=>{
                        setManager(newValue);
                    }}
                    inputValue={managerInput}
                    onInputChange={(e, newInputValue)=>{
                        setManagerInput(newInputValue);
                    }}    
                    options={managers}
                    getOptionLabel={(option) => option.title}
                    style={{ width: 300 }}
                    renderInput={(params) => 
                    <TextField {...params} 
                    label="Manager" 
                    variant="outlined" 
                    style={{maxWidth:'70%'}} 
                    />}
                    />
                </div>
                <div className={classes.project__description}>
                    <span className={classes.label}>Project Description</span>: 
                    <InputBase value={tempDescription} 
                    type='textarea' placeholder='Enter Description...' 
                    fullWidth multiline 
                    onChange={handleDescriptionChange}
                    className={classes.description}
                    />
                </div>
                <div className = {classes.project__deadline}>
                    <form className={classes.calendar__container} noValidate = {true}>
                        <TextField
                        label="Project Deadline"
                        type="date"
                        defaultValue={selectedDate}
                        className={classes.calendar}
                        InputLabelProps={{
                            shrink:true
                        }}
                        onChange={handleDateChange}
                        ></TextField>
                    </form>
                </div>
                <Button size="small" color="primary" variant="outlined" className = {classes.save__button} onClick={handleSave}>
                    Save
                </Button>
                <Button size="small" color="secondary" variant="outlined" className = {classes.delete__button}>
                    Delete
                </Button>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default ProjectModal;