type TEnvInstance = {
  setEnv: (data: { [k: string]: any }) => TEnvInstance;
  set: (key: string, value: any) => TEnvInstance;
  [k: string]: any;
};

const env = (function () {
  let instance: TEnvInstance;

  function createInstance() {
    const object = new Object({
      setEnv: function (data) {
        instance = { ...instance, ...data };
        return instance;
      },
      set: function (key, value) {
        instance[key] = value;
        return instance;
      },
    } as TEnvInstance) as TEnvInstance;
    return object;
  }

  return {
    instance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();
export default env.instance();
