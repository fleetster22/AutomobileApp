import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';


function ModelForm () {
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const handleNameChange = (event) => setName(event.target.value);

    const [pictureUrl, setPictureUrl] = useState('');
    const handlePictureChange = (event) => setPictureUrl(event.target.value);

    const [manufacturer, setManufacturer] = useState('');
    const handleManufacturerChange = (event) => setManufacturer(event.target.value);

    const [manufacturers, setManufacturers] = useState([]);



    const fetchData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/';

        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers);
        }
        if (true) {
            setLoad(!load);
        }
    };

    useEffect(() => {
        fetchData();
    }, [load]);



    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};

        data.name = name;
        data.picture_url = pictureUrl;
        data.manufacturer_id = manufacturer;

        const modelUrl = 'http://localhost:8100/api/models/';
        const fetchConfig ={
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(modelUrl, fetchConfig);
        if (response.ok) {
            const newModel = await response.json();

            setName('');
            setPictureUrl('');
            setManufacturer('');
            navigate("/models/");
        }

    }



    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new model</h1>
                    <form onSubmit={handleSubmit} id="create-model-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleNameChange} placeholder="Name" required
                                type="text" name="name" id="name" value={name}
                                className="form-control"/>
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePictureChange} placeholder="Picture URL" required
                                type="text" name="picture_url" id="picture_url" value={pictureUrl}
                                className="form-control"/>
                            <label htmlFor="picture_url">Picture URL</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleManufacturerChange} required name="manufacturer" id="manufacturer" value={manufacturer} className="form-select">
                                <option value="">Choose a manufacturer</option>
                                {manufacturers.map(manufacturer => {
                                    return (
                                        <option key={manufacturer.id} value={manufacturer.id}>
                                            {manufacturer.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ModelForm;
