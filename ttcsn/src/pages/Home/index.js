import React, { useEffect, useState } from 'react';
import { imageDb } from './config.js';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { v4 } from "uuid";
import banner from "../../image/1.jpg"
function Home() {
    const [img, setImg] = useState('');
    const [imgUrl, setImgUrl] = useState([]);

    const handleClick = () => {
        if (img !== null) {
            console.log(img);
            const imgRef = ref(imageDb, `project/${v4()}`);
            uploadBytes(imgRef, img).then(value => {
                console.log(value);
                getDownloadURL(value.ref).then(url => {
                    setImgUrl(data => [...data, url])
                    console.log(url);
                })
            });
        }
    }
    useEffect(() => {
        listAll(ref(imageDb, "files")).then(imgs => {
            //console.log(imgs);
            imgs.items.forEach(val => {
                getDownloadURL(val).then(url => {
                    setImgUrl(data => [...data, url])
                })

            });
        })
    }, [])
    // return (
    //     <>
    //         <img src={banner} alt='banner'/>
    //     </>
    // )
    
    

    return (
        <>
        <div>
                <input type="file" onChange={(e) => {
                    console.log(e);
                    setImg(e.target.files[0]);
                    console.log(e.target.files[0]);
                }} />
                <button onClick={handleClick}>Upload</button>
                
            </div>
            <div>
                <a href='https://firebasestorage.googleapis.com/v0/b/imageuploaddb-2d968.appspot.com/o/project%2Fbf5a9ce9-460d-46a7-a964-bdda8a72fa4e?alt=media&token=e717ef64-6e5c-4e71-88fe-eabec2b09187'>Hợp đồng</a>
            </div>
        </>

    );

}
export default Home;


