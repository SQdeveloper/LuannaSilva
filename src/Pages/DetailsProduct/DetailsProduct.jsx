import React, { useContext, useState } from 'react';
import Header from '../../Components/Header/Header';
import {BiMinus} from 'react-icons/bi'
import {BsPlusLg} from 'react-icons/bs'
import { useParams } from 'react-router-dom';
import {ShopContext} from '../../Context/ShopContext';
import './DetailsProduct.css';
import ModalAddToCart from '../../Components/ModalAddToCard/ModalAddToCart';

const DetailsProduct = () => {
    let {id} = useParams();
    const all_products = useContext(ShopContext).data;
    const selectedProduct = all_products.filter(product => Number(product.id) === Number(id))[0];        
    const [selectedColor, setSelectedColor] = useState(selectedProduct.colors[0]);    
    const [amount, setAmount] = useState(1);
    const [isOpenModal, setIsOpenModal] = useState(false);

    //Función que abre el modal cuando se hace click en el boton agregar al carrito
    const openModal = ()=>{
        setIsOpenModal(true);
    }

    const closeModal = ()=>{
        setIsOpenModal(false);
    }

    //Función que aumenta la cantidad de prendas a comprar
    const increaseAmount = ()=>{
        setAmount(amount=>amount+1);
    }

    //Función que disminuye la cantidad de prendas a comprar
    const decreaseAmount = ()=>{
        if(amount === 1) return;
        setAmount(amount=>amount-1);
    }

    //Función que controlla cuando se elige un color de ropa
    const handleInputColor = (index, e)=>{
        const divColor = document.querySelectorAll('.detailProduct-info-color');

        //Removemos la clase active de todos lo colores
        divColor.forEach(color=>{color.classList.remove('active')});
        //Agregamos la clase active  al color seleccionado
        divColor[index].classList.add('active');

        //Guardamos el color seleccionado en el stado SelectedColor
        setSelectedColor(e.target.value);                
    }

    //Función que controlla cuando se eligé una talla de ropa
    const handleSelectTalla = (e)=>{
        const buttonTalla = document.querySelectorAll('.detailProduct-info-talla');
        
        //Quitamos la clase active para que pierdan el color
        buttonTalla.forEach(btn=>{ btn.classList.remove('active')});

        //Agregamos la clase active para que cambie de color el boton
        e.target.classList.add('active');
    }

    return (
        <>
            <Header></Header>
            <div className='detailProduct'>
                <div className="detailProduct-image">
                    <img src={selectedProduct.image} alt="" />
                </div>
                <section className="detailProduct-info">
                    <h2 className="detailProduct-info-title">{selectedProduct.name}</h2>
                    <span className="detailProduct-info-price">$ {selectedProduct.price}</span>
                    <hr />
                    <h3 className='detailProduct-info-subtitle'>Tall:</h3>
                    <div className="detailProduct-info-contTallas">
                        <button onClick={handleSelectTalla} className="detailProduct-info-talla active">
                            S
                        </button>
                        <button onClick={handleSelectTalla} className="detailProduct-info-talla">
                            M
                        </button>
                        <button onClick={handleSelectTalla} className="detailProduct-info-talla">
                            L
                        </button>
                        <button onClick={handleSelectTalla} className="detailProduct-info-talla">
                            XL
                        </button>
                    </div>
                    <div className="detailProduct-info-contTitleColor">
                        <h3 className='detailProduct-info-subtitle'>Colors Disponibles:</h3>
                        <span>{selectedColor}</span>
                    </div>
                    <div className="detailProduct-info-colors">
                        <div className="detailProduct-info-color active">
                            <input value={selectedProduct.colors[0]} onChange={(e)=>{handleInputColor(0,e)}} name='colors' type='radio' style={{backgroundColor:selectedProduct.colors[0]}}></input>
                        </div>
                        <div className="detailProduct-info-color">
                            <input value={selectedProduct.colors[1]} onChange={(e)=>{handleInputColor(1,e)}} name='colors' type='radio' style={{backgroundColor:selectedProduct.colors[1]}}></input>
                        </div>
                        <div className="detailProduct-info-color">
                            <input value={selectedProduct.colors[2]} onChange={(e)=>{handleInputColor(2,e)}} name='colors' type='radio' style={{backgroundColor:selectedProduct.colors[2]}}></input>
                        </div>
                    </div>
                    <h3 className="detailProduct-info-subtitle">Amount</h3>
                    <div className="detailProduct-info-contAmount">
                        <button onClick={decreaseAmount}><BiMinus className='detailProduct-info-contAmount-btn-icon'/></button>
                        <span>{amount}</span>
                        <button onClick={increaseAmount}><BsPlusLg className='detailProduct-info-contAmount-btn-icon'/></button>
                    </div>
                    <button onClick={openModal} className='detailProduct-info-btn-addCart'>ADD TO CART</button>
                    <a className='detailProduct-info-btn-buy' href="">BUY NOW</a>
                </section>
            </div>
            {isOpenModal && <ModalAddToCart closeModal={closeModal} price={selectedProduct.price} name={selectedProduct.name} color={selectedColor} image={selectedProduct.image}/>}
        </>
    );
};

export default DetailsProduct;