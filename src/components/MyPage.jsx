import React, { useEffect } from 'react'
import { useState } from 'react'
import {Col, Row, Card, Form, InputGroup, Button} from 'react-bootstrap'
import { app } from '../firebaseInit'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
import { getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage'
import ModalPostcode from './ModalPostcode'

const MyPage = ({history}) => {
    const uid = sessionStorage.getItem('uid');
    const db = getFirestore(app);
    const storage = getStorage(app);
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState(null);
    const [form, setForm] = useState({
        email: sessionStorage.getItem('email'),
        name:'무기명',
        phone: '010-1010-1010',
        address: '인천 서구 경서동',
        photo:'',
    });
    const {name, phone, address, photo } = form;
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const onChangeFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(URL.createObjectURL(e.target.files[0]));
    }

    const getUser = async() => {
        const result = await getDoc(doc(db, 'user', uid));
        setForm(result.data());
        setFileName(result.data().photo ? result.data().photo: 'https://via.placeholder.com/200x200');
    }

    const onPostcode = (address)=> {
        setForm({
            ...form,
            address:address
        });
    }

    const onSave = async() => {
        if(!window.confirm('변경내용을 수정하실래요?')) return;
        setLoading(true);
        if(file){
            const snapshot = await uploadBytes(ref(storage, `/photo/${Date.now()}.jpg`), file);
            const url = await getDownloadURL(snapshot.ref);
            await setDoc(doc(db, 'user', uid), { ...form, photo:url });
        }else{
            await setDoc(doc(db, 'user', uid), { ...form });
        }
        setLoading(false);
        history.push('/');
    }

    useEffect(()=>{
        getUser();
    }, []);

    if(loading) return <h1 className='text-center my-5'>로딩중......</h1>
    return (
        <Row className='my-5'>
            <Col>
                <h1 className='text-center mb-5'>회원정보</h1>
                <Card className='p-5'>
                    <Form>
                        <InputGroup className='my-2'>
                            <InputGroup.Text className='px-5'>메일</InputGroup.Text>
                            <Form.Control readOnly
                                value={sessionStorage.getItem('email')}/>
                        </InputGroup>
                        <InputGroup className='my-2'>
                            <InputGroup.Text className='px-5'>이름</InputGroup.Text>
                            <Form.Control 
                                onChange={onChange} name="name"
                                value={name}/>
                        </InputGroup>
                        <InputGroup className='my-2'>
                            <InputGroup.Text className='px-5'>전화</InputGroup.Text>
                            <Form.Control 
                                onChange={onChange} name="phone"
                                value={phone}/>
                        </InputGroup>
                        <InputGroup className='my-2'>
                            <InputGroup.Text className='px-5'>주소</InputGroup.Text>
                            <Form.Control 
                                onChange={onChange} name="address"
                                value={address}/>
                            <ModalPostcode onPostcode={onPostcode}/>    
                        </InputGroup>
                        <div className='my-2'>
                            <img src={fileName} width="25%" className='my-2'/>
                            <Form.Control 
                                onChange={onChangeFile}
                                type="file"/>
                        </div>
                        <div className='text-center my-2'>
                            <Button onClick={onSave}
                                className='px-5'>정보수정</Button>
                        </div>    
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}

export default MyPage