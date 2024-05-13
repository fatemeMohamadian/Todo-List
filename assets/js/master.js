const inpsearch = document.querySelector('#search')
const inpmain = document.querySelector('#maintext')
const btnadd = document.querySelector('#btnadd')
const list1 = document.querySelector('#tasks')
const listcheck = document.querySelector('#listcheck')
const h2tag = document.getElementById('h2tag')
const h3tag = document.getElementById('h3tag')
const boxmain = document.querySelector('#boxmain')
let flag = 0
let x = new Date().toLocaleString()
let alldata = []
if (localStorage.getItem('todostorage') != null) {
    alldata = JSON.parse(localStorage.getItem('todostorage'))
    alldata.map((val) => {
        let li = document.createElement('li')
        li.style.width = '100%'
        li.style.display = 'flex'
        li.style.justifyContent = 'space-between'
        li.style.alignItems = 'center'
        li.style.padding = '0 10px'
        li.style.margin = '10px 0'
        li.style.borderRadius = '8px'
        li.style.backgroundColor = 'rgb(219, 219, 238)'
        li.style.flexWrap = 'wrap'
        li.innerHTML = `<input id=labeltext${val.flag} onclick="check(this)" type="checkbox" style="width:20px; height:20px; padding:15px 15px;">
                    <label id="label1"  for="labeltext${val.flag}" style="padding:15px 15px;" class="text-xl">${val.inptxt}</label>
                    <div id="boxedit"
                    class="hidden z-40 flex-wrap justify-center items-center absolute bg-sky-400 *:mx-[10px] *:my-[10px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                    <span id="close"
                        class="w-full flex justify-end cursor-pointer hover:text-red-700 transition-all duration-[.7s]"
                        onclick="btnclose(this)"><i class="icon-cancel"></i></span>
                        <label for="inptext" class="font-boldfont text-lg font-semibold text-white">Edit Your
                        Task:</label>
                        <input id="inptext" type="text" class="w-[80%] h-[50px] outline-none bg-sky-100">
                    <button onclick="itemchange(this)"
                        class="font-boldfont hover:bg-rose-700 hover:text-white transition-all duration-[.5s] px-5 py-2 bg-slate-100 rounded-lg">Save</button>
                    </div>
                    <div style="display: flex; justify-content: center; align-items: center; padding:15px 15px;">
                    <span class="text-lg text-slate-600 flex font-boldfont">${x}</span>
                    <span style="padding:0 15px" onclick="edit(this)" class="cursor-pointer" ><i class="icon-edit text-xl"></i></span>
                    <span onclick="del(this)" class="cursor-pointer"><i class="icon-trash text-xl"></i></span>
                    </div>`
        list1.appendChild(li)
        h2tag.innerHTML = 'To Do'
        flag = alldata.length

    })
}
btnadd.addEventListener('click', () => {
    if (inpmain.value != '') {
        let li = document.createElement('li')
        li.style.width = '100%'
        li.style.display = 'flex'
        li.style.justifyContent = 'space-between'
        li.style.alignItems = 'center'
        li.style.padding = '0 10px'
        li.style.margin = '10px 0'
        li.style.borderRadius = '8px'
        li.style.backgroundColor = 'rgb(219, 219, 238)'
        li.style.flexWrap = 'wrap'
        li.innerHTML = `<input id=labeltext${flag} onclick="check(this)" type="checkbox" style="width:20px; height:20px; padding:15px 15px;">
                    <label id="label1"  for="labeltext${flag}" style="padding:15px 15px;" class="text-lg">${inpmain.value}</label>
                    <div id="boxedit"
                    class="hidden z-50 flex-wrap justify-center items-center absolute bg-sky-400 *:mx-[10px] *:my-[10px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                    <span id="close"
                        class="w-full flex justify-end cursor-pointer hover:text-red-700 transition-all duration-[.7s]"
                        onclick="btnclose(this)"><i class="icon-cancel"></i></span>
                        <label for="inptext" class="font-boldfont text-lg font-semibold text-white">Edit Your
                        Task:</label>
                        <input id="inptext" type="text" class="w-[80%] h-[50px] outline-none bg-sky-100">
                    <button onclick="itemchange(this)"
                        class="font-boldfont hover:bg-rose-700 hover:text-white transition-all duration-[.5s] px-5 py-2 bg-slate-100 rounded-lg">Save</button>
                    </div>
                    <div style="display: flex; justify-content: center; align-items: center; padding:15px 15px;">
                    <span class="text-lg text-slate-600 flex font-boldfont">${x}</span>
                    <span style="padding:0 15px" onclick="edit(this)" class="cursor-pointer" ><i class="icon-edit text-xl"></i></span>
                    <span onclick="del(this)" class="cursor-pointer"><i class="icon-trash text-xl"></i></span>
                    </div>`
        list1.appendChild(li)
        h2tag.innerHTML = 'To Do'
        flag++

        const datalist = {
            flag: flag,
            inptxt: inpmain.value
        }
        alldata.push(datalist)
        localStorage.setItem('todostorage', JSON.stringify(alldata))
        inpmain.value = null

    }

    else {
        alert('The Input Is Empty!!...Please Try Again.')
    }
})
const del = (f) => {
    f.parentElement.parentElement.remove()
    h2tag.innerHTML = ''

}
const edit = (f) => {
    f.previousElementSibling.parentElement.previousElementSibling.classList.remove('hidden')
    f.previousElementSibling.parentElement.previousElementSibling.classList.add('flex')
    boxmain.style.display = 'flex'
    let temp = f.previousElementSibling.parentElement.previousElementSibling.previousElementSibling.innerHTML
    f.previousElementSibling.parentElement.previousElementSibling.firstElementChild.nextElementSibling.nextElementSibling.value = temp
    f.previousElementSibling.parentElement.previousElementSibling.firstElementChild.nextElementSibling.nextElementSibling.focus()

}
const itemchange = (f) => {
    let inpval = f.previousElementSibling.value
    f.previousElementSibling.previousElementSibling.previousElementSibling.parentElement.previousElementSibling.innerHTML = inpval
    boxmain.style.display = 'none'
    f.parentElement.classList.add('hidden')
}
const btnclose = (f) => {
    f.parentElement.classList.add('hidden')
    boxmain.style.display = 'none'
}
function check(f) {
    if (f.checked) {
        listcheck.appendChild(f.parentElement)
        listcheck.style.display = 'flex'
        listcheck.previousElementSibling.style.display = 'flex'
        f.parentElement.style.backgroundColor = 'yellow'
        f.nextElementSibling.style.textDecoration = 'none'
        f.parentElement.style.opacity = '100%'
    }
    else {
        list1.appendChild(f.parentElement)
        f.parentElement.style.backgroundColor = 'rgb(219, 219, 238)'
        listcheck.previousElementSibling.style.display = 'none'
    }
}
inpsearch.addEventListener('input', (e) => {
    const labelval = document.querySelectorAll('#tasks #label1')
    let searchval = e.target.value
    labelval.forEach((item) => {
        if (item.innerHTML.indexOf(searchval) == -1) {
            item.parentElement.style.display = 'none'
            h2tag.innerHTML = 'No Task Found!!'
        }
        else {
            item.parentElement.style.display = 'flex'
            h2tag.innerHTML = 'To Do'
        }
    })
})