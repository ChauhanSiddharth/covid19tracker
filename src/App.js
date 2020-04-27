import React from 'react';

import { Cards, Chart, CountryPicker } from './components';
import { Typography } from '@material-ui/core';
import styles from './App.module.css';
import { fetchData } from './api';

import coronaImage from './images/covid-19.png';



class App extends React.Component {
    state = {
        data : {},
        country: '',
    }

    async componentDidMount(){
        const fetchedData = await fetchData();

        this.setState({ data : fetchedData })
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        
        this.setState({ data: fetchedData, country: country });
    }
    

    render() {
        const { data, country } = this.state;
        return(
            <div className={styles.container}>
                <img className={styles.image} src={coronaImage} alt="COVID-19"/>
                <Typography variant="overline" display="block" className={styles.retroshadow}  gutterBottom>
                COVID-19 TRACKER
                </Typography>
                <Cards data={ data }/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={ data } country={ country }/>
            </div>
        )
    }
}

export default App;