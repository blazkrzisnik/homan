// Privzeti (fallback) meni — prikazan, dokler Supabase ni povezan ali je prazen.
const FALLBACK_MENU = [
  { category: 'kava', name: 'Espresso', description: 'Kratka, močna kava.', price: '1,80 €' },
  { category: 'kava', name: 'Kapučino', description: 'Espresso z mlečno peno.', price: '2,60 €' },
  { category: 'kava', name: 'Homanova bela kava', description: 'Hišna mešanica z rahlo karamelno noto.', price: '2,90 €' },
  { category: 'kava', name: 'Vroča čokolada', description: 'Gosta, temna čokolada s smetano.', price: '3,20 €' },
  { category: 'slascice', name: 'Grajska torta', description: 'Orehov biskvit, kremna polnitev, čokoladna glazura.', price: '4,50 €' },
  { category: 'slascice', name: 'Loška makronova torta', description: 'Mandljev biskvit z rahlo kremo.', price: '4,20 €' },
  { category: 'slascice', name: 'Domača jabolčna štrudlja', description: 'Postrežena mlačna, s stepeno smetano.', price: '3,80 €' },
  { category: 'slascice', name: 'Izbor hišnih piškotov', description: 'Vsak dan sveže pečeni.', price: '2,50 €' },
  { category: 'hrana', name: 'Toast Mestni trg', description: 'Pršut, sir in rukola.', price: '5,90 €' },
  { category: 'hrana', name: 'Domača frtalja', description: 'Loška tradicionalna omleta z zelišči.', price: '6,50 €' },
  { category: 'hrana', name: 'Sirov krožnik', description: 'Izbor domačih sirov s prilogami.', price: '7,90 €' },
];

const CATEGORY_LABEL = { kava: 'Kava & napitki', slascice: 'Torte & slaščice', hrana: 'Slano & prigrizki' };

function renderMenu(items) {
  const list = document.getElementById('menuList');
  if (!items.length) {
    list.innerHTML = '<p class="menu-state">Ponudba trenutno ni na voljo. Pokličite nas na 04 512 30 47.</p>';
    return;
  }
  list.innerHTML = items.map(item => `
    <div class="menu-row" data-menu-cat="${item.category}" style="${item.category !== 'kava' ? 'display:none;' : ''}">
      <div>
        <div class="name">${item.name}</div>
        <div class="desc">${item.description || ''}</div>
      </div>
      <div class="price">${item.price}</div>
    </div>
  `).join('');
}

async function loadMenu() {
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('menu_items')
        .select('*')
        .order('category', { ascending: true });
      if (!error && data && data.length) {
        renderMenu(data);
        return;
      }
    } catch (e) {
      console.warn('Napaka pri nalaganju menija iz Supabase, uporabljam privzete podatke.', e);
    }
  }
  renderMenu(FALLBACK_MENU);
}

loadMenu();
