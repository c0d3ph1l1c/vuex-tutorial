export function createPlugin(options = {}) {
  return function(store) {
    const namespace = options.namespace || '';
    store.dispatch(namespace + '/pluginAction');
  }
}

export const myModule = {
  actions: {
    pluginAction(context) {
      alert('MyPlugin is loaded!');
    }
  }
};