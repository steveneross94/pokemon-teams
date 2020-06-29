document.addEventListener("DOMContentLoaded", () => {

    const BASE_URL = "http://localhost:3000"
    const TRAINERS_URL = `${BASE_URL}/trainers`
    const POKEMONS_URL = `${BASE_URL}/pokemons`

    const fetchPokemon = () => {
        fetch(TRAINERS_URL)
        .then(response => response.json())
        .then(trainers => getTrainers(trainers))

        document.addEventListener("click", e => {
            if (e.target.textContent === "Add Pokemon"){
                
                // const trainers = Array.from(document.getElementsByClassName("card"))
                const trainersUl = e.target.nextElementSibling
                if (e.target.textContent === 'Add Pokemon'){
                    if (trainersUl.children.length < 6) {
                        fetch(POKEMONS_URL,{
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json",
                
                            },
                            body: JSON.stringify({ 
                                pokemon: {
                                trainer_id: `${e.target.dataset.trainerId}`
                                }
                            })
                        })
                    .then(resp => resp.json())
                    .then(pokemon => {
                      const pokemonLi = document.createElement('li')
                    //   console.log(pokemon)
                      pokemonLi.innerHTML = `
                      ${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
                      `
                      trainersUl.appendChild(pokemonLi)
                    });
                    } 
                }
                // trainers.filter((t) => {
                //     console.log(t)
                // })
               
                
            } else if (e.target.textContent = "Release") {
            //    console.log(e.target.previousSibling);
            //    console.log(e.target.parentNode)
               
                
                fetch(POKEMONS_URL+`/${e.target.dataset.pokemonId}`, {
                    method: 'DELETE',
                })
               e.target.parentNode.remove()
    
            }
          
            
        })
    }

    const getTrainers = (trainers) => {trainers.forEach(trainer => {
        const main = document.querySelector('main');
        const divTrainer = document.createElement('div');
        const trainerButton = document.querySelectorAll(".card")
        divTrainer.className = 'card'
        divTrainer.innerHTML = 
        `
            <p>${trainer.name}</p>
            <button data-trainer-id=${trainer.id}>Add Pokemon</button>
            <ul>
            ${trainer.pokemons.map(pokemon => {
                return `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`}).join(' ')}
            </ul>
        `
        main.append(divTrainer)

        
    })
    
    
        
    }

 

    

fetchPokemon()
})



/* <div class="card" data-id="1"><p>Prince</p>
  <button data-trainer-id="1">Add Pokemon</button>
  <ul>
    <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
    <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
    <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
    <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
    <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
  </ul>
</div> */

