const CACHE_NAME = 'presente-magico-v1'; // Pense nisso como a "versão" do seu app offline. Se você mudar muito os arquivos, pode mudar esse número para 'presente-magico-v2' para forçar a atualização.
const urlsToCache = [
  '/', // Isso é a página inicial do seu site
  '/index.html',
  '/style.css',
  '/script.js',
  '/favicon.png', // Seu ícone

  // --- LISTA DE IMAGENS ---
  '/coracao.png',
  '/comp_neutro.png',
  '/quebrado.png',
  '/falling_heart.png',
  '/falling_sparkle.png',
  // **Atenção:** Se você tiver mais imagens usadas no seu site,
  // COMO AS IMAGENS DAS PERGUNTAS OU DA GALERIA DO SANTUÁRIO FINAL,
  // você precisa listá-las aqui também. Exemplo:
  // '/caminho/para/minha_imagem_da_pergunta.jpg',
  // '/caminho/para/foto_do_santuario1.png',
  // Se suas imagens estiverem em uma subpasta (ex: 'imagens/'), o caminho seria '/imagens/nome_da_imagem.png'

  // --- LISTA DE ÁUDIOS ---
  '/book_open.mp3',
  '/page_turn.mp3',
  '/correct_answer.mp3',
  '/wrong_answer.mp3',
  '/heart_shatter_sound.mp3',
  '/success_quest.mp3',
  '/unlock_charm.mp3',
  '/discovery_chime.mp3',
  '/final_melody.mp3',
  '/paper_open.mp3',
  '/paper_close.mp3'
  // Adicione qualquer outro arquivo de áudio se houver
];

// Este bloco é para quando o app é "instalado" pela primeira vez.
// Ele guarda todos os arquivos listados acima no cache do celular.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Cache aberto!'); // Mensagem para você no console do navegador
        return cache.addAll(urlsToCache); // Adiciona todos os arquivos para o cache
      })
  );
});

// Este bloco é para quando o app está funcionando.
// Ele verifica se o arquivo que o app precisa está no cache.
// Se estiver, ele usa do cache (muito mais rápido!).
// Se não estiver (e não deveria estar se você listou tudo!), ele busca na internet.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request) // Tenta encontrar o que o app pediu no cache
      .then(response => {
        if (response) {
          return response; // Achou no cache, usa o do cache
        }
        return fetch(event.request); // Não achou no cache, busca na internet
      })
  );
});

// Este bloco é para limpar caches antigos quando você atualiza o service-worker.js (ex: muda a versão do cache).
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('presente-magico-') && cacheName !== CACHE_NAME;
        }).map(cacheName => {
          return caches.delete(cacheName); // Deleta caches com nomes antigos
        })
      );
    })
  );
});