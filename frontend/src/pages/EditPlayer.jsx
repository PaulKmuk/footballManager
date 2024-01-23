import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import { Button, Input, Select, ModalAccept } from '../components'
import { FaPlus, FaUserEdit } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { Link } from 'react-router-dom';

const EditPlayer = () => {

    
    const data = useContext(AuthContext)
    const { currentUser } = useContext(AuthContext)
    const { id } = useParams()
    const navigate = useNavigate()
    const options = ['BR', 'OBR', 'POM', 'NAP']
    const [showModalAccept, setShowModalAccept] = useState(false)
    const [fileImg, setFileImg] = useState('')
    const [error, setError] = useState('')
    const [editPlayer, setEditPlayer] = useState({
        id_user: data.currentUser.id,
        name: '',
        lastname: '',
        dateOfBirth: '',
        position: '',
        imgPlayer: null
    })
    
    const upload = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData()
            formData.append('imgPlayer', fileImg)
            const res = await axios.post("http://localhost:8800/upload", formData)
            console.log(res.data);
            return res.data
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/players/${currentUser.id}`)
                const player = res.data.find(el => el.id === parseInt(id))
                setEditPlayer(player)
            } catch (error) {
                console.log(error);
            }
            
        }
        fetchPlayer()
    },[])
    
    console.log(editPlayer);

    const handleChange = (e) => {
        setEditPlayer(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const submitUploadPlayer = async (e) => {
        e.preventDefault();
        let img
        if(fileImg === '') img = editPlayer.imgPlayer
        if(fileImg !== '') img = await upload(e)
        // const img = await upload(e)
        console.log(img);
        console.log(editPlayer);
        try {
            await axios.put(`http://localhost:8800/players/${editPlayer.id}?id_user=${currentUser.id}`, {
                ...editPlayer,
                imgPlayer: img
            })
            setError("")
            navigate("/players")
        } catch (error) {
            console.log(error);
        }
        setShowModalAccept(false)
    }

  return (
    <div className='p-4'>
        <h1 className='text-xl font-bold py-4'>Edytuj zawodnika</h1>
        <div className='w-full bg-[#191c24] card p-4 md:py-10'>
            <form
                className='w-full mx-auto max-w-[1000px]'
            >
                <h1 className='text-xl font-bold py-4'>Dane zawodnika:</h1> 
                <div className='flex flex-col gap-4 text-lg font-bold'>

                    <label>Imię:</label>
                    <Input 
                        value={editPlayer.name}
                        onChange={handleChange}
                        name='name'
                        type="text"
                        placeholder='Imię'/>

                    <label>Nazwisko:</label>
                    <Input 
                        value={editPlayer.lastname}
                        onChange={handleChange}
                        name='lastname'
                        type='text'
                        placeholder='Nazwisko'/>

                    <label>Rok urodzenia:</label>
                    <Input 
                        value={editPlayer.dateOfBirth}
                        onChange={handleChange}
                        name='dateOfBirth'
                        type='number'
                        placeholder='RRRR'/>

                    <label>Pozycja:</label>
                    <Select 
                        value={editPlayer.position}
                        placeholder='wybierz pozycję'
                        onChange={handleChange}
                        name='position'
                        options={options}/>
                    <label>Zdjęcie:</label>
                    <Input 
                        onChange={e => setFileImg(e.target.files[0])}
                        name='fileImg'
                        type='file'/>

                    <p className='text-red-500'>{error}</p>

                </div>
                <div className='pt-10 flex gap-4'>
                    <Link to='/players' className='ml-auto'>
                        <Button 
                            size='l'
                            icon={<GiCancel />}
                            color='red'
                            label='Anuluj'/>
                    </Link>
                    <Button 
                        onClick={(e) => {
                            e.preventDefault(e)
                            setShowModalAccept(true)
                        }}  
                        // onClick={() => setShowModalAccept(true)}
                        // onClick={(e) => submitUploadPlayer(e)}
                        size='l'
                        icon={<FaPlus />}
                        color='blue'
                        label='Zapisz'/>
                </div>
            </form>
        </div>

        {/* --- MODAL ACCEPT ---  */}
        {showModalAccept && (
            <ModalAccept 
                title='Aktualizuj zawodnika'
                labelButton='Zaktualizuj'
                color='green'
                icon={<FaUserEdit />}
                description='Czy na pewno chcesz aktualizować tego zawodnika?'
                onClickCancel={() => {
                    setShowModalAccept(false)
                }}
                onClickAccept={(e) => submitUploadPlayer(e)}/>
        )}

    </div>
  )
}

export default EditPlayer