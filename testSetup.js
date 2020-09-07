

import { enableFetchMocks } from 'jest-fetch-mock'

jest.mock("react-ga")
enableFetchMocks()
window.matchMedia = () => {return{match: true}};

