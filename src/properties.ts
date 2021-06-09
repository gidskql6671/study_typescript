import propertiesReader from 'properties-reader';
import path from 'path';

const properties = propertiesReader(path.join(__dirname, 'configs/config.properties'));

export function getDbLink(): any{
	return properties.get("database.url");
}

export function getServerPort(): any{
	return properties.get("server.port");
}