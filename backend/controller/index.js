const _ = require('lodash'); 
const axios = require('axios').default;
const fs = require('fs');
const { performance } = require('perf_hooks');
const apiUrl = 'https://rickandmortyapi.com/api/'
var characters
var episodes
var locations

/*
/* Función inicial para consultar todas las API.
*/
async function init () {
    characters = await getPromises('character')
    episodes = await getPromises('episode')
    locations = await getPromises('location')
}

/*
/* Devuelve el set de objetos a utilizar,
/* dependiendo del parámetro resource.
*/
function returnVariable (resource) {
    if (resource === 'character')
        return characters;
    else if (resource === 'episode')
        return episodes;
    else if (resource === 'location')
        return locations;
    return;
}

/*
/* Devuelve el número de páginas a consultar en la API.
/* Consulta la API definida en el resource.
*/
async function getPages(resource) {
    let pages;
    if (!resource || _.isUndefined(resource))
        return;
    await axios.get(apiUrl + resource).then((response) => {
        pages = response.data.info.pages;
    })
     .catch ((error) => {
         if (error.response.status === 404) {
             console.error(`Oopsi, la página ${resource} es incorrecta`);
         }
         return;
    })
    return pages;
}

/*
/* Devuelve la información consultada de
/* todas las páginas de la API.
/* Consulta la API definida en el resource.
*/
async function getPromises(resource) {
    // Devuelve los 'results' de la data
    let pages = await getPages(resource);
    let promises = [];
    if (!pages || _.isUndefined(pages))
        return;
    for (let page = 1; page < pages+1; page++) {
        promises.push(axios.get(apiUrl + resource + '/?page=' + page));
    }
    let data;
    await Promise.all(promises).then((response) => {
        data = response.map((r) => { return r.data })
        data = data.map((d) => { return d.results })
        data = _.flatten(data)
    })
    .catch (error => {
        console.log(error)
        return;
    })
    return data
}

/*
/* Devuelve el diccionario con:
/* el nombre del resource (API) consultada,
/* el char que se utilizó para hacer el contador y
/* la cantidad de apariciones del char.
*/
async function getCounter (resource, char) {
    // Devuelve el dict con la cuenta de caracteres
    let data = returnVariable(resource)
    if (!data || _.isUndefined(data))
        return;
    let finalDict = {
        'char': char,
        'count': 0,
        'resource': resource
    }
    let list = [];
    let names = data.map((d) => { return d.name });
    let regex = new RegExp(char, 'gi');
    names.forEach((name) => {
        list.push((name.match(regex) || []).length);
    })
    finalDict['count'] = _.sum(list);
    return finalDict;
}

/*
/* Devuelve el diccionario con:
/* el nombre del ejercicio 'Char Counter',
/* el tiempo que se tomó en ejecutar el programa,
/* si el programa estuvo en el tiempo esperado (<3s)
/* resultados devueltos por la funcion getCounter
*/
async function charCounter () {
    //Llama al contador por resource y define el tiempo
    start = performance.now();
    let charDict = {
        'exercise_name': 'Char Counter',
        'time': '',
        'in_time': false,
        'results': []
    }
    let listResult = [];
    listResult.push(await getCounter('character', 'c'));
    listResult.push(await getCounter('episode', 'e'));
    listResult.push(await getCounter('location', 'l'));
    executionTime = (performance.now() - start % 6000) / 1000;
    charDict['results'] = listResult;
    charDict['time'] = `${executionTime} s`;
    if (executionTime < 3)
        charDict['in_time'] = true;
    return charDict;
}

/*
/* Devuelve el diccionario con:
/* nombre del episodio,
/* número del episodio,
/* origin(location) de todos los personajes por episodio.
/* La función consulta los personajes por episodio para
/* devolver la lista de origins.
*/
async function getEpisodes () {
    // Devuelve el dict con los origin(location) por episodio
    if (!episodes || _.isUndefined(episodes))
        return;
    if (!characters || _.isUndefined(characters)) {
        return;
    }
    let listEpisodes = []
    for (let d = 0; d < episodes.length; d++) {
        let detail = {
            'name': episodes[d].name,
            'episode': episodes[d].episode,
            'locations':[]
        }
        let characterIds = [];
        episodes[d].characters.forEach((characterUrl) => {
            let ids = characterUrl.split('/')
            characterIds.push(ids[ids.length - 1])
        })
        let resdata;
        if (characterIds.length > 0) {
            let charactersEpisode = characters.filter((c) => {
                return characterIds.includes(c.id.toString())
            })
            charactersEpisode = charactersEpisode.map((d) => { return d.origin })
            charactersEpisode = charactersEpisode.map((d) => { return d.name });
            detail['locations'] = _.uniq(_.map(charactersEpisode));
        }
        listEpisodes.push(detail);
    }
    return listEpisodes;
}

/*
/* Devuelve el diccionario con:
/* el nombre del ejercicio 'Episode Locations',
/* el tiempo que se tomó en ejecutar el programa,
/* si el programa estuvo en el tiempo esperado (<3s)
/* resultados devueltos por la funcion getEpisodes()
*/
async function episodeLocation () {
    //Llama a los episodios y define el tiempo
    start = performance.now();
    let charDict = {
        'exercise_name': 'Episode Locations',
        'time': '',
        'in_time': false,
        'results': []
    }
    charDict['results'] = await getEpisodes();
    executionTime = (performance.now() - start % 6000) / 1000;
    charDict['time'] = `${executionTime} s`;
    if (executionTime < 3)
        charDict['in_time'] = true;
    return charDict;
}

/*
/* Funcion incial que ejecuta los programas y
/* devuelve y exporta el output en formato json.
*/
async function main () {
    await init();
    let finalList = [];
    finalList.push(await charCounter());
    finalList.push(await episodeLocation());
    let json = JSON.stringify(finalList, null, 4);
    return json
}
module.exports = init;
module.exports = returnVariable;
module.exports = getPages;
module.exports = getPromises;
module.exports = getCounter;
module.exports = charCounter;
module.exports = getEpisodes;
module.exports = episodeLocation;
module.exports = main;