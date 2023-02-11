import { getEnvBoolean, getEnvNumber, getEnvString } from '../env';

const addMetaTag = () => {
  const meta = document.createElement('meta');
  meta.setAttribute('name', 'server-var');
  meta.setAttribute('key', 'ENV_VAR');
  document.head.appendChild(meta);
};

describe('util - getEnvString', () => {
  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    addMetaTag();
  });

  afterEach(() => {
    const meta = document.querySelector('meta[name="server-var"]');
    meta?.setAttribute('value', '');
  });

  it('Should return env variable with type string', () => {
    const value = 'Random Value';
    const meta = document.querySelector('meta[name="server-var"]');
    meta?.setAttribute('value', value);

    const envVar = getEnvString({ name: 'ENV_VAR' });
    expect(envVar).toBe(value);
    expect(typeof envVar).toBe('string');
  });

  it('Should throw error if env var not found and required is true', () => {
    const t = () => {
      getEnvString({ name: 'ENV_VAR' });
    };

    expect(t).toThrow('Missing value for enviorment variable ENV_VAR.');
  });

  it('Should return default value if env var is missing', () => {
    const envVar = getEnvString({ name: 'ENV_VAR', defaultValue: 'Random value' });
    expect(envVar).toBe('Random value');
  });
});

describe('util - getEnvNumber', () => {
  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    addMetaTag();
  });

  afterEach(() => {
    const meta = document.querySelector('meta[name="server-var"]');
    meta?.setAttribute('value', '');
  });

  it('Should return env variable with type number', () => {
    const value = '1000';
    const meta = document.querySelector('meta[name="server-var"]');
    meta?.setAttribute('value', value);

    const envVar = getEnvNumber({ name: 'ENV_VAR' });
    expect(envVar).toBe(Number(value));
    expect(typeof envVar).toBe('number');
  });

  it('Should throw error if env var not found and required is true', () => {
    const t = () => {
      getEnvNumber({ name: 'ENV_VAR' });
    };

    expect(t).toThrow('Missing value for enviorment variable ENV_VAR.');
  });

  it('Should return default value if env var is missing', () => {
    const envVar = getEnvNumber({ name: 'ENV_VAR', defaultValue: 1000 });
    expect(envVar).toBe(1000);
  });
});

describe('util - getEnvBoolean', () => {
  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    addMetaTag();
  });

  afterEach(() => {
    const meta = document.querySelector('meta[name="server-var"]');
    meta?.setAttribute('value', '');
  });

  it('Should return env variable with type boolean', () => {
    const value = 'true';
    const meta = document.querySelector('meta[name="server-var"]');
    meta?.setAttribute('value', value);

    const envVar = getEnvBoolean({ name: 'ENV_VAR', defaultValue: false });
    expect(envVar).toBe(true);
    expect(typeof envVar).toBe('boolean');
  });

  it('Should throw error if env var not found and required is true', () => {
    const t = () => {
      getEnvBoolean({ name: 'ENV_VAR' });
    };

    expect(t).toThrow('Missing value for enviorment variable ENV_VAR.');
  });

  it('Should return default value if env var is missing', () => {
    const envVar = getEnvBoolean({ name: 'ENV_VAR_BOOL', defaultValue: false });
    expect(envVar).toBe(false);
  });

  it('Should throw parse error if env variable is not able parse into boolean', () => {
    const value = 'Wrong';
    const meta = document.querySelector('meta[name="server-var"]');
    meta?.setAttribute('value', value);
    const t = () => {
      getEnvBoolean({ name: 'ENV_VAR' });
    };

    expect(t).toThrow('Could not parse enviorment variable ENV_VAR as Boolean.');
  });
});
