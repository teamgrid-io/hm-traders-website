"use client";
import { useState } from "react"
import './ProductCounter.css'


export default function ProductCounter(){
    const [productCount, setProductCount] = useState(1);
    const decreaseNumber = ()=>{
        if(productCount!==1){
            setProductCount(productCount-1)
        }
    }
    return(
        <div className="Counter">
            <span className="operator" onClick={decreaseNumber}>-</span>
            <span className="count">{productCount}</span>
            <span className="operator" onClick={()=>{setProductCount(productCount+1)}}>+</span>
        </div>
    )
}