import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import CardProduct from "../../Components/CardProduct/CardProduct";
import { IoOptionsOutline } from "react-icons/io5";
import { IoChevronBack } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { Slider } from "@mui/material";
import useFilters from "../../Hooks/useFilters";
import "./ProductCollection.css";

const ProductCollection = () => {
  //Parametro que contiene el nombre del tipo de collection que quiere ver el usuario
  const { collectionName } = useParams();
  //Uso el Hook Filter y retorna todos los productos filtrados por el nombre de la collection elegida por el usuario
  // const filteredProducts = useFilters({color:'goldenrod'});
  const {filteredProducts, prices, setCategory, setColor, setPrices, setTalla} = useFilters();
  //Estado que almacena true o false, con esto se sabe si se debe mostrar los filtros
  const [isOpenFilters, setIsOpenFilters] = useState(true);
  //Estado que almacena un array con el valor inferior y superior de filtro precios
  // const [prices, setPriceValues] = useState([0, 100]);
  //Variable que almacena la distancia minima entre el limite inferior y superior del precio
  const minDistance = 10;  

  //Función que retorna el valueText
  function valuetext(value) {
    return `${value}°C`;
  }

  //Funcion que se ejecuta cuando hay un cambio en el slider del precio
  const handleChange = (event, newValue, activeThumb) => {
    //Event es necesario que no se quite
    //Variable que almacena un array con los dos valores numericos de los precios
    //Almacena el limite inferior y limite superior del precio
    let values;

    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      values = [
        Math.min(newValue[0], prices[1] - minDistance),
        prices[1],
      ];
      setPrices(values);
    } else {
      values = [
        prices[0],
        Math.max(newValue[1], prices[0] + minDistance),
      ];
      setPrices(values);
    }
    //Actualizamos los precios en los inputs
    changeValueInputsPrice(values);
  };

  //Función que actualiza los values de los inputs de los precios
  //La función se ejecuta cada vez que hay un cambio en el slider de los precios
  const changeValueInputsPrice = (_values) => {
    const priceInputs = document.querySelectorAll(
      ".productCollection-filter-price"
    );
    priceInputs[0].value = _values[0];
    priceInputs[1].value = _values[1];
  };

  //Función que se ejecuta cuando se hace click en el boton filter
  const handleFilter = () => {
    //Actualizo el estado isOpenFilters como Toggle(true, fase)
    setIsOpenFilters((isOpenFilters) => !isOpenFilters);
    //Obtengo el icono chevronRight del boton filters
    const arrow = document.querySelector(".productCollection-arrow-icon");
    //Agrego y quito la clase active segun se haga click en el boton filters
    //Al agregar la clase active se gira 180deg al icon chevron
    arrow.classList.toggle("active");
  };

  const handleFilterTalla = (e)=>{
    // if(!e.target.checked) return;
    const checkboxs_talla = document.getElementsByName('filter-talla');
    checkboxs_talla.forEach(checkbox =>{
      if(checkbox.checked) {}
    })
    // const selectedTalla = e.target.nextElementSibling.textContent.toLowerCase();
    // setTalla(selectedTalla);
  }

  return (
    <>
      <Header />
      <section className="productCollection">
        <h1 className="productCollection-title">Collection</h1>
        <button className="productCollection-btn-filter" onClick={handleFilter}>
          <IoOptionsOutline />
          <span>Filters</span>
          <IoChevronBack className="productCollection-arrow-icon" />
        </button>
        <div className="productCollection-groups">
          {isOpenFilters && (
            <div className="productCollection-group-filters">
              <ul>
                <li>
                  <h2 className="productCollection-filter-subtitle">Precio</h2>
                  <div className="group-filter-price">
                    <input
                      className="productCollection-filter-price"
                      type="text"
                    />
                    <input
                      className="productCollection-filter-price"
                      type="text"
                    />
                  </div>
                  <Slider
                    className="slider-filter-price"
                    getAriaLabel={() => "Minimum distance"}
                    value={prices}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    disableSwap
                  />
                </li>
                <li>
                  <h2 className="productCollection-filter-subtitle">Talla</h2>
                  <label className="productCollection-filter-talla" htmlFor="t">
                    <input onChange={handleFilterTalla} name="filter-talla" type="checkbox" />
                    <span>S</span>
                  </label>
                  <label className="productCollection-filter-talla" htmlFor="t">
                    <input onChange={handleFilterTalla} name="filter-talla" type="checkbox" />
                    <span>M</span>
                  </label>
                  <label className="productCollection-filter-talla" htmlFor="t">
                    <input onChange={handleFilterTalla} name="filter-talla" type="checkbox" />
                    <span>L</span>
                  </label>
                  <label className="productCollection-filter-talla" htmlFor="t">
                    <input onChange={handleFilterTalla} name="filter-talla" type="checkbox" />
                    <span>XL</span>
                  </label>
                </li>
                <li>
                  <h2 className="productCollection-filter-subtitle">
                    Colors Disponibles
                  </h2>
                  <label htmlFor="" className="productCollection-filter-color">
                    <input type="checkbox" />
                    <span>Red</span>
                  </label>
                  <label htmlFor="" className="productCollection-filter-color">
                    <input type="checkbox" />
                    <span>Blue</span>
                  </label>
                  <label htmlFor="" className="productCollection-filter-color">
                    <input type="checkbox" />
                    <span>Green</span>
                  </label>
                  <label htmlFor="" className="productCollection-filter-color">
                    <input type="checkbox" />
                    <span>Yellow</span>
                  </label>
                </li>
              </ul>
            </div>
          )}
          <div className="productCollection-group-products">
            {filteredProducts &&
              filteredProducts.map((product) => (
                <CardProduct
                  key={product.id}
                  id={product.id}
                  category={"none"}
                  colors={product.colors}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                />
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductCollection;