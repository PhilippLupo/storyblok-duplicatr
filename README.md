<p align="center">
  <h1 align="center">storyblok-duplicatr</h1>
  <p align="center">Duplicate your stories, components and datasources to another space</p>
</p>
<br><br>

## Instalation
```npm install storyblok-duplicatr```

## Usage
Make sure to change the ```userdata.js``` by adding your storyblok credentials and also adjust the ```config.js```, 
by entering the: 
  1. ```spaceToDuplicate``` (spaceID of the source Space)
  2. ```targetSpace``` (spaceID of the target Space)
  3. ```publicToken``` (public token of the source Space)
  
Run your desired task with ```gulp storyblok:duplicate:stories```
