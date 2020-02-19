import { IConfig } from '../interfaces'

export class ConfigService {
  private config: IConfig = { serverURL: '', port: '' }
  setConfig (config: IConfig) {
    this.config = config
  }
  getConfig () {
    return this.config
  }
}

const configService = new ConfigService()

export default configService
