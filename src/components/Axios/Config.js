import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://vms-y7cy.onrender.com/cms-api',
    withCredentials: true
})

export default instance