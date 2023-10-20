import './style.css'
import dogs from './dogs.json';
import '../node_modules/bootstrap/dist/css/bootstrap.css'

interface Kutya {
  id: number;
  nev: string;
  eletkor: number;
  fajta: string;
  gazda_neve: string;
}

function tablazat(){
  dogs.forEach((d, idx) => {
    let tr = document.createElement('tr');
    let id = document.createElement('td');
    let nev = document.createElement('td');
    let kor = document.createElement('td');
    let fajta = document.createElement('td');
    let gazda = document.createElement('td');
    let szerkeszt = document.createElement('td');
    let btnSzerkeszt = document.createElement('button');
    let torol = document.createElement('td');
    let btnTorles = document.createElement('button');

    id.textContent = d.id.toString();
    nev.textContent = d.nev.toString();
    kor.textContent = d.eletkor.toString();
    fajta.textContent = d.fajta.toString();
    gazda.textContent = d.gazda_neve.toString();
    
    tr.appendChild(id);
    tr.appendChild(nev);
    tr.appendChild(kor);
    tr.appendChild(fajta);
    tr.appendChild(gazda);
    szerkeszt.appendChild(btnSzerkeszt);
    tr.appendChild(szerkeszt);
    torol.appendChild(btnTorles);
    tr.appendChild(torol);

    document.getElementById('table')!.appendChild(tr);

    btnTorles.innerText = 'Törlés';
    btnTorles.addEventListener('click',() => {
      dogs.splice(idx, 1);
      tr.remove()
    })

    btnSzerkeszt.textContent = 'Szerkeszt';
    btnSzerkeszt.addEventListener('click',() => {
      
      tr.classList.add('jeloles');

      let inId = document.createElement('input');
      let inNev = document.createElement('input');
      let inKor = document.createElement('input');
      let inFajta = document.createElement('input');
      let inGazda = document.createElement('input');

      let btnMentes = document.createElement('button');
      btnMentes.innerText = 'Mentés';
      btnMentes.addEventListener('click',() =>{
        
        d.id = parseInt(inId.value);
        d.nev = inNev.value;
        d.eletkor = parseInt(inKor.value);
        d.fajta = inFajta.value;
        d.gazda_neve = inGazda.value;

        id.innerText = inId.value;
        nev.innerText = inNev.value;
        kor.innerText = inKor.value;
        fajta.innerText = inFajta.value;
        gazda.innerText = inGazda.value;

        inId.remove();
        inNev.remove();
        inKor.remove();
        inFajta.remove();
        inGazda.remove();
        tr.classList.remove('jeloles');
        btnMentes.remove();
      })

      inId.value = id.innerText;
      inNev.value = nev.innerText;
      inKor.value = kor.innerText;
      inFajta.value = fajta.innerText;
      inGazda.value = gazda.innerText;

      inId.type = 'number';
      inKor.type = 'number';
      
      id.innerText = '';
      nev.innerText = '';
      kor.innerText = '';
      fajta.innerText = '';
      gazda.innerText = '';

      id.appendChild(inId);
      nev.appendChild(inNev);
      kor.appendChild(inKor);
      fajta.appendChild(inFajta);
      gazda.appendChild(inGazda);
      szerkeszt.appendChild(btnMentes);
    })
  })
}


document.addEventListener('DOMContentLoaded',() =>{
  tablazat();
  document.getElementById('btnHozzaad')!.addEventListener('click',() => {

    let inId = document.createElement('input');
    let inNev = document.createElement('input');
    let inKor = document.createElement('input');
    let inFajta = document.createElement('input');
    let inGazda = document.createElement('input');

    let tr = document.createElement('tr');
    let id = document.createElement('td');
    let nev = document.createElement('td');
    let kor = document.createElement('td');
    let fajta = document.createElement('td');
    let gazda = document.createElement('td');
    let mentes = document.createElement('td');
    let error = document.createElement('td');
    error.classList.add('error');
    let btnMegse = document.createElement('button');
    btnMegse.textContent = 'Mégse'
    
    let btnMentes = document.createElement('button');
    btnMentes.innerText = 'Mentés';
    
    id.appendChild(inId);
    nev.appendChild(inNev);
    kor.appendChild(inKor);
    fajta.appendChild(inFajta);
    gazda.appendChild(inGazda);
    mentes.appendChild(btnMentes);
    mentes.appendChild(btnMegse);
    tr.appendChild(id);
    tr.appendChild(nev);
    tr.appendChild(kor);
    tr.appendChild(fajta);
    tr.appendChild(gazda);
    tr.appendChild(mentes);
    tr.appendChild(error);
    document.getElementById('table')!.appendChild(tr);

    btnMentes.addEventListener('click',() => {

      dogs.forEach((d) => {
        if(d.id == parseInt(inId.value))
        {
          error.innerText = 'Van már ilyen id!';
          throw new Error('Van már ilyen id!');
        }
      })

      if(isNaN(parseInt(inId.value)))
        {
          error.innerText = 'Adj meg egy ID-t!';
          throw new Error('Adj meg egy ID-t!');
        }

      if(inNev.value.trim().length < 2)
        {
          error.innerText = 'Adj meg egy nevet!';
          throw new Error('Adj meg egy nevet!');
        }

      if(isNaN(parseInt(inKor.value)))
        {
          error.innerText = 'Adj meg életkort!';
          throw new Error('Adj meg életkort!');
        }

      if(inFajta.value.trim().length < 2)
        {
          error.innerText = 'Adj meg egy fajtát!';
          throw new Error('Adj meg egy fajtát!');
        }

      if(inGazda.value.trim().length < 2)
        {
          error.innerText = 'Adj meg egy gazdát!';
          throw new Error('Adj meg egy gazdát!');
        }

      const obj : Kutya = {
        id: parseInt(inId.value),
        nev: inNev.value,
        eletkor: parseInt(inKor.value),
        fajta: inFajta.value,
        gazda_neve: inGazda.value
      }
      dogs.push(obj)
      
      document.getElementById('table')!.innerHTML = '';
      tablazat();
    })

    btnMegse.addEventListener('click', () => tr.remove())
  })
})