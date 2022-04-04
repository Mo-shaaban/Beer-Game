import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
// import {BrowserRouter as Router} from 'react-router-dom';
import {useParams } from 'react-router-dom'

export default function Instructorlanding() {
    const {id}=useParams()
    console.log({id})
    var url1='/creategame/'+id;
    console.log(url1)
    var url2="/viewgame/"+id;
    return (
        <>
            <div className='cards'>
                <div className='cards__container'>
                    <div className='cards__wrapper'>
                        <ul className='cards__items'>
                            <CardItem
                                src='/images/img-5.jpg'
                                text='CREATE GAME: Create new games to play'
                                path= {url1}
                            />
                            <CardItem
                                src='/images/img-6.jpg'
                                text='VIEW GAME: View your current games'
                                path= {url2}
                            />
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
