// this is all week 4 stuff


const classSelector = document.getElementById('classes');
let storedClasses = {};
let storedRaces = {};

const genders = ['M', 'F', 'None', 'Other', 'Whatever', 'All'];

const randomize = (arr) =>
{
    return arr[Math.floor(Math.random() * arr.length)];
}

// set up the code to talk to the api
const apiBaseRoute = 'https://www.dnd5eapi.co/api';

const resourceFetch = (resource, options) =>
{
    // this will be easier to use as a promise, maybe?
    return new Promise((resolve, reject) =>
    {
        let route = `${apiBaseRoute}/${resource}`;
        if (options)
        {
            // need to handle this
        }
        fetch(route)
        .then((response) =>
        {
            // error handling needs to happen here, what if there is no Dana? (json)
            return response.json();
        })
        .then((data) =>
        {
            // error handling needs to happen here, what if the response code is not a good one?
            resolve(data.results);
        })
        .catch((err) =>
        {
            // getting the fetch to actually fail to here is harder than you think
            console.log('Fetch failed: ', err);
            reject(err);
        });
    })

}


// event for when they change the selected class
function selectClass(event)
{
    const selection = event.target.value;
    const cardClass = document.getElementById('cardClass');
    switch (selection)
    {
        case 'random':
        {
            // chose a random race;
            const possilbeChoices = Object.keys(storedClasses);
            const choice = randomize(possilbeChoices);
            cardClass.textContent = storedClasses[choice];
            break;
        }
        case 'placeholder':
        {
            cardClass.textContent = 'Class';
            break;
        }
        default:
        {
            cardClass.textContent = storedClasses[selection];
        }
    }
    
	
}
// HERE IS THE LEVEL STUFF
const levelSelector = (event) =>
{
    const choice = event.target.value;
    const cardLevel = document.getElementById('cardLevel');

    cardLevel.textContent = choice;
}
function levelDropdownMaker()
{
    const select = document.createElement('select');
    let temp;
    for (let i = 1; i <= 20; i++)
    {
        temp = document.createElement('option');
        temp.value = i;
        temp.textContent = i;
        select.appendChild(temp);
    }
    select.addEventListener('change', levelSelector);
    return select;
}
const levelSelect = document.getElementById('levelSelect');
levelSelect.appendChild(levelDropdownMaker());

// END OF THE LEVEL STUFF

// this function returns an entire <div><input><etc> block to add to the control bar
const controlMaker = (type, options) =>
{
    console.log(`making ${type}: `, options);
    const holder = document.createElement('div');
    if (options.label)
    {
        const label = document.createElement('label');
        label.textContent = options.label;
        holder.appendChild(label);
    }
    switch(type)
    {
        case 'select':
            const select = document.createElement('select');
            let temp;
            const placeholder = document.createElement('option');
            placeholder.value = 'placeholder';
            placeholder.textContent = `Select a ${options.label}`;
            select.appendChild(placeholder);
            for (let i = 0; i < options.options.length; i++)
            {
                console.log('looping: ', i);
                temp = document.createElement('option');
                temp.value = options.options[i];
                if (typeof options.options[i] === 'string')
                {
                    temp.textContent = options.options[i].toUpperCase();
                }
                else
                {
                    // assume it is an object and we have to handle that
                    temp.textContent = options.options[i].name;
                    temp.value = options.options[i].index;
                }


                select.appendChild(temp);
            }

            // add randomizer
            if (options.random)
            {
                const random = document.createElement('option');
                random.value = 'random';
                random.textContent = 'Random';
                select.appendChild(random);
            }


            if (options.event)
            {
                select.addEventListener('change', options.event);
            }
            holder.appendChild(select);
            break;
        default:
            console.log('no clue lulz');
            break;
    }

    return holder;
};

const genderSelect = (event) =>
{
    const selection = event.target.value;
    const cardGender = document.getElementById('cardGender');
    switch (selection)
    {
        case 'random':
        {
            // chose a random race;
            const choice = randomize(genders);
            cardGender.textContent = choice;
            break;
        }
        case 'placeholder':
        {
            cardGender.textContent = 'Gender';
            break;
        }
        default:
        {
            cardGender.textContent = selection;
        }
    }
}

const controls = document.getElementById('controls');
controls.appendChild(controlMaker('select', {label: 'Gender', options: genders, random: true,
event: genderSelect}));



const raceSelect = (event) =>
{
    const selection = event.target.value;
    const cardRace = document.getElementById('cardRace');
    switch (selection)
    {
        case 'random':
        {
            // chose a random race;
            const possilbeChoices = Object.keys(storedRaces);
            const choice = randomize(possilbeChoices);
            cardRace.textContent = storedRaces[choice];
            break;
        }
        case 'placeholder':
        {
            cardRace.textContent = 'Race';
            break;
        }
        default:
        {
            cardRace.textContent = storedRaces[selection];
        }
    }
}
resourceFetch('classes')
.then((data) =>
{
    data.forEach((option) =>
    {
        storedClasses[option.index] = option.name;
    });
    controls.appendChild(controlMaker('select', {label: 'Class', options: data, event: selectClass, random: true}));
});
resourceFetch('races')
.then((data) =>
{
    data.forEach((race) =>
    {
        storedRaces[race.index] = race.name;
    })
    controls.appendChild(controlMaker('select', {label: 'Race', options: data, event: raceSelect, random: true}));
})

const nameInput = document.getElementById("name")
const cardName = document.getElementById("cardName")
nameInput.addEventListener('change',function(e){
    cardName.textContent = nameInput.value
})
const ageInput = document.getElementById("age")
const cardAge = document.getElementById("cardAge")
ageInput.addEventListener('change',function(e){
    cardAge.textContent = ageInput.value
})