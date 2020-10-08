const input = document.querySelector('.input');
const repositoriesList = document.querySelector('.repositories');
const mainContainer = document.querySelector('.main');
const USER_PER_PAGE = 5;
async function addRepositories() {
    if (input.value) {
        return await fetch(`https://api.github.com/search/repositories?q=${input.value}&per_page=${USER_PER_PAGE}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            }).then(res => {
                const resArr = res['items'];
                console.log(...resArr);
                clearRepositoriesElement();
                resArr.forEach(el => {

                    const repositoriesListElement = createElement('li', 'list-box-element');
                    repositoriesListElement.textContent = el.name;
                    repositoriesList.append(repositoriesListElement);

                    function clickHandler() {
                        const container = createElement('li', 'container');
                        repositoriesList.innerHTML = '';
                        document.querySelector('.form-search').append(container);
                        const spanName = createElement('div');
                        spanName.textContent = `Name: ${el.name} `
                        const spanOwner = createElement('div');
                        spanOwner.textContent = `Owner : ${el.owner.login}`;
                        const spanStars = createElement('div');
                        spanStars.textContent = `Stars: ${el.stargazers_count} `;
                        const icon = createElement('button', 'icon');
                        icon.classList.add('btn');

                        const elemCLose = createElement('span', 'close');

                        const ElementInfo = createElement('div', 'elementInfo');
                        icon.append(elemCLose);
                        container.append(ElementInfo);
                        container.append(icon);
                        ElementInfo.append(spanName);
                        ElementInfo.append(spanOwner);
                        ElementInfo.append(spanStars);
                        function clearContainer() {
                            container.style.display = 'none';
                        }
                        container.querySelector('.icon').addEventListener('click', (e) => {
                            e.preventDefault();
                            repositoriesList.style.display = 'none';
                            container.style.top = '-500px';
                            input.value = '';
                            setTimeout(clearContainer, 2000);
                        })
                    }
                    repositoriesListElement.addEventListener('click', clickHandler);
                });
                repositoriesList.style.display = 'block'
            });
    } else {
        clearRepositoriesElement();
    }

}

addRepositories = debounce(addRepositories, 500);
input.addEventListener('keyup', addRepositories);

function createElement(elementName, className) {
    const element = document.createElement(elementName);
    if (className) {
        element.classList.add(className);
    }
    return element;
}

function debounce(fn, ms) {
    let timeout;
    return function () {
        const fnCall = () => { fn.apply(this, arguments) };
        clearTimeout(timeout);
        timeout = setTimeout(fnCall, ms)
    }
}

function clearRepositoriesElement() {
    repositoriesList.innerHTML = '';
}


