import React from 'react'
import { Row, Col, Table, Button } from 'react-bootstrap'
import { app } from '../firebaseInit'
import { getDatabase, ref, onValue, remove } from 'firebase/database'
import { useEffect } from 'react';
import { useState } from 'react';
import MapPage from './MapPage';

const FavoritePage = () => {
    const db = getDatabase(app);
    const uid = sessionStorage.getItem('uid');
    const [favorite, setFavorite] = useState([]);

    const getFavorite = () => {
        onValue(ref(db, `/favorite/${uid}`),(result)=>{
            let rows = [];
            result.forEach(row=>{
                rows.push(row.val());
            });
            //console.log(rows);
            setFavorite(rows);
        });
    }

    const onDelete = async(id) => {
        if(!window.confirm(id + '번 즐겨찾기를 삭제하실래요?')) return;
        await remove(ref(db, `/favorite/${uid}/${id}`));
    }

    useEffect(()=> {
        getFavorite();
    }, []);

    return (
        <Row className='my-5'>
            <Col>
                <h1 className='text-center'>즐겨찾기</h1>
                <Table>
                    <thead>
                        <tr>
                            <td>장소명</td>
                            <td>주소</td>
                            <td>전화</td>
                            <td>위치</td>
                            <td>삭제</td>
                        </tr>
                    </thead>
                    <tbody>
                        {favorite.map(fa=>
                        <tr key={fa.id}>
                            <td>{fa.place_name}</td>
                            <td>{fa.address_name}</td>
                            <td>{fa.phone}</td>
                            <td><MapPage local={fa}/></td>
                            <td><Button onClick={()=>onDelete(fa.id)}
                                    className='btn-sm'>삭제</Button></td>
                        </tr>
                        )}
                    </tbody>
                </Table>
            </Col>
        </Row>
    )
}

export default FavoritePage