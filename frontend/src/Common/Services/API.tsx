import {PublicApi,AdminsApi} from "./Swagger/api"
import {ConfigurationParameters} from "./Swagger/configuration"
import {url} from "../../Config/Config"

let config:ConfigurationParameters = {
  basePath: url.serverBaseURL
}

export let adminAPI = new AdminsApi(config,undefined,fetch)
export let publicAPI = new PublicApi(config,undefined,fetch)


