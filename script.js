const dataBase = {
    residentialComplex: [
        {id: 156, name: "Краснопресненская набережная"},
        {id: 445, name: "Лужники Парк"},
        {id: 542, name: "Новая Рига"},
        {id: 245, name: "Изумрудные Холмы"},
        {id: 452, name: "Савелки"},
        {id: 78, name: "Солнцево Парк"},
        {id: 775, name: "Золотые Ключи"},
        {id: 4554, name: "Артек"},
        {id: 45367, name: "Сколково"},
        {id: 7867, name: "ЖК Корона"},
        {id: 75234, name: "Лесные горки"},
        {id: 78675, name: "Квартал на Красной Пресне"},
        {id: 75634, name: "СкайФорт"},
        {id: 75645, name: "Парк Победы"},
        {id: 756, name: "Московская Дубрава"},
        {id: 1767556, name: "Рублево-Успенское шоссе"},
        {id: 757, name: "ЖК Метрополис"},
        {id: 7576375, name: "Ромашково"},
        {id: 753675, name: "Новое Бутово"},
        {id: 753676, name: "Арбат Эстейт"},
    ],
    bigDistricts: [
        {id: 7417, name: "Центральный округ (ЦАО)"},
        {id: 753852, name: "Северный округ (САО)"},
        {id: 7472, name: "Северо-Восточный округ (СВАО)"},
        {id: 75727, name: "Восточный округ (ВАО)"},
        {id: 727583, name: "Юго-Восточный округ (ЮВАО)"},
        {id: 2742142, name: "Южный округ (ЮАО)"},
        {id: 7867583, name: "Юго-Западный округ (ЮЗАО)"},
        {id: 1237, name: "Западный округ (ЗАО)"},
        {id: 45675, name: "Северо-Западный округ (СЗАО)"},
        {id: 4253453, name: "Новомосковский округ (Новомосковский)"},
    ],
    districts: [
        {id: 78954, name: "Академический"},
        {id: 42373, name: "Алексеевский"},
        {id: 7837537, name: "Алтуфьевский"},
        {id: 7853786, name: "Арбат"},
        {id: 71124, name: "Аэропорт"},
        {id: 247583, name: "Бабушкинский"},
        {id: 4537583, name: "Басманный"},
        {id: 4537583, name: "Дмитровский"},
        {id: 7583453, name: "Донской"},
        {id: 457856, name: "Дорогомилово"},
        {id: 7584238, name: "Северный"},
        {id: 7857537, name: "Соколиная Гора"},
        {id: 4536786, name: "Текстильщики"},
        {id: 123785207, name: "Теплый Стан"},
        {id: 705607686, name: "Филевский Парк"},
        {id: 78607, name: "Фили-Давыдково"},
        {id: 708607, name: "Хамовники"},
        {id: 750786, name: "Черемушки"},
        {id: 7866240, name: "Чертаново Центральное"},
        {id: 7057580, name: "Щербинка"},
        {id: 7507856, name: "Южное Медведково"},
        {id: 78507, name: "Южное Тушино"},
        {id: 70856073, name: "Южнопортовый"},
        {id: 73830, name: "Якиманка"},
    ],
    metroStations: [
        {id: 453045, name: "Арбатская"},
        {id: 30456, name: "Краснопресненская"},
        {id: 4564505, name: "Баррикадная"},
        {id: 456045, name: "Смоленская"},
        {id: 89770, name: "Киевская"},
        {id: 95460, name: "Парк Победы"},
        {id: 6780, name: "Александровский сад"},
        {id: 76907, name: "Красные ворота"},
        {id: 4567880, name: "Чистые пруды"},
        {id: 56078, name: "Таганская"},
        {id: 13087, name: "Павелецкая"},
        {id: 9554068, name: "Добрынинская"},
    ],
};
let selectedElements = [];

const dropdown = document.querySelector('.dropdown');
const openDropdownButton = document.querySelector('.button');

openDropdownButton.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('hidden');
    openDropdownButton.classList.toggle('button-active');
});
dropdown.addEventListener('click', (e) => {
    e.stopPropagation();
});
window.addEventListener('click', () => {
    dropdown.classList.add('hidden');
    openDropdownButton.classList.remove('button-active');
});

const dropdownList = document.querySelector('.dropdown-list');

const tabListItem = document.querySelectorAll('.tab-list__item');

let activeTab = 'residentialComplex'

getList();

tabListItem.forEach((elem) => {
    elem.addEventListener('click', () => {
        tabListItem.forEach((item) => item.classList.remove('tab-list__item-active'));
        elem.classList.add('tab-list__item-active');
        activeTab = elem.getAttribute('data-tab');
        getList();
    });
});

function getList() {
    dropdownList.innerHTML = '';
    dataBase[activeTab].forEach(({id, name}) => {
        const dropdownListItem = document.createElement('li');
        dropdownListItem.classList.add('dropdown-list__item');

        dropdownList.append(dropdownListItem);

        const customCheckbox = document.createElement('label');
        customCheckbox.classList.add('custom-checkbox');

        dropdownListItem.append(customCheckbox);

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.name = name;
        input.id = id;
        if(selectedElements.some((item) => +item.id === id)) {
            input.checked = true;
        }
        customCheckbox.append(input);

        const span = document.createElement('span');
        const innerSpan = document.createElement('span');
        innerSpan.textContent = name;
        span.append(innerSpan)

        customCheckbox.append(span);
    });
    checkedFilter();
}

function checkedFilter() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => input.onclick = (e) => e.stopPropagation());
    const lists = document.querySelectorAll('.custom-checkbox');
    lists.forEach((item) => {
        item.addEventListener('click', () => {
            const input = item.querySelector('input');
            if (!input.checked) {
                if (!selectedElements.includes(input.id)){
                    selectedElements.push({id: input.id, name: input.name});
                }
            } else {
                selectedElements = selectedElements.filter(e => e.id!== input.id);
            }
            showChips();
            showCount()
        });
    });
}


const dropdownSelected = document.querySelector('.dropdown__selected');
const dropdownListContainer = document.querySelector('.dropdown-list__container');
function showChips() {
    if (selectedElements.length !== 0) {
        dropdownSelected.classList.remove('hidden');
        dropdownListContainer.classList.add('min');
        dropdownSelected.innerHTML = '';
        selectedElements.forEach(({name, id}) => {
            const selectedItem = document.createElement('div');
            selectedItem.classList.add('selected__item');
            selectedItem.textContent = name;
            const img = document.createElement('img');
            img.alt = 'close';
            img.src = '/images/close.svg';
            img.setAttribute('data-id', id);
            selectedItem.append(img);
            dropdownSelected.append(selectedItem);
        });
    } else {
        dropdownSelected.classList.add('hidden');
        dropdownListContainer.classList.remove('min');
    }
}

dropdownSelected.addEventListener('click', (e) => {
    if(e.target.tagName.toLowerCase() === 'img') {
        const id = e.target.getAttribute('data-id');
        selectedElements = selectedElements.filter(e => e.id!== id);
        showChips();
        showCount();
        getList();
    }
});

function showCount() {
    const selectedCount = document.querySelector('.selected-count');
    selectedCount.textContent = selectedElements.length.toString();
    if (selectedElements.length !== 0) {
        selectedCount.classList.remove('hidden');
        openDropdownButton.classList.add('count-active');
    } else {
        selectedCount.classList.add('hidden');
        openDropdownButton.classList.remove('count-active');
    }
}
