import threading, time
import asyncio, requests
from random import randint
import concurrent.futures

# def worker(text):
#     counter = 0
#     while True:
#         time.sleep(1)
#         counter += 1
#         print(f"{text}: {counter}")

# threading.Thread(target=worker, daemon=True, args=("ABC",)).start()
# threading.Thread(target=worker, daemon=False, args=("XYZ",)).start()
# input("Press enter to quit")


# https://vscode.dev/github/ArjanCodes/2022-asyncio
# https://github.com/CoreyMSchafer/code_snippets/tree/master/Python/Threading


JSON = int | str | float | bool | None | dict[str, "JSON"] | list["JSON"]
JSONObject = dict[str, JSON]
JSONList = list[JSON]

def http_get_sync(url: str) -> JSONObject:
    response = requests.get(url)
    return response.json()

async def http_get(url: str) -> JSONObject:
    return await asyncio.to_thread(http_get_sync, url)

# The highest Pokemon id
MAX_POKEMON = 898

async def get_random_pokemon_name() -> str:
    pokemon_id = randint(1, MAX_POKEMON)
    pokemon_url = f"https://pokeapi.co/api/v2/pokemon/{pokemon_id}"
    pokemon = await http_get(pokemon_url)
    return str(pokemon["name"])

async def poke():
    tasks = [get_random_pokemon_name() for _ in range(10)]
    names = await asyncio.gather(*tasks)
    [print(name) for name in names]
    print(names)

asyncio.run(poke())


img_urls = [
    'https://images.unsplash.com/photo-1516117172878-fd2c41f4a759',
    'https://images.unsplash.com/photo-1532009324734-20a7a5813719',
    'https://images.unsplash.com/photo-1524429656589-6633a470097c',
    'https://images.unsplash.com/photo-1530224264768-7ff8c1789d79',
    'https://images.unsplash.com/photo-1549692520-acc6669e2f0c'
]

t1 = time.perf_counter()

def download_image(img_url):
    img_bytes = requests.get(img_url).content
    img_name = img_url.split('/')[3]
    img_name = f'{img_name}.jpg'
    with open(img_name, 'wb') as img_file:
        img_file.write(img_bytes)
        print(f'{img_name} was downloaded...')

with concurrent.futures.ThreadPoolExecutor() as executor:
    executor.map(download_image, img_urls)

t2 = time.perf_counter()

print(f'Finished in {t2-t1} seconds')
