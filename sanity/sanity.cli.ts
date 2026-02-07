import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '01lrn3ze',
    dataset: 'development',
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
    appId: 'vhm7l7e79m8fo6f00ogw6x6t',
  },
})
