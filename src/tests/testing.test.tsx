import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { Home } from "../pages/home/index"
import { UserContext } from "../context/UserContex"
import Card from "../components/card/card"
import userEvent from "@testing-library/user-event"
import { Name } from "../components/Name"

describe("Funcionalidades do Site", () => {
  test("Verifica se o site consegue obter os dados da api", async () => {
    const mockProduct = [
      {
        id: 1,
        title: "Produto 1",
        price: 1,
        description: "Descrição 1",
        category: "Categoria 1",
        image: "imagem1.jpg"
      },
      {
        id: 2,
        title: "Produto 2",
        price: 2,
        description: "Descrição 2",
        category: "Categoria 2",
        image: "imagem2.jpg"
      }
    ]
    
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockProduct)
      })
    )

    const user = {
      uid: "1A@B3C",
      id: "1",
      name: "Claudinha",
      email: "claudinha@gmail.com",
    }

    function addUser() {}
    function updateDataUser() {}

    const { findByText, findAllByRole } = render(
      <MemoryRouter>
        <UserContext.Provider value={{user, addUser, updateDataUser}}>
          <Home />
        </UserContext.Provider>
      </MemoryRouter>
    )

    const product1_title = await findByText("Produto 1")
    const product1_price = await findByText("R$ 1")
    const product2_title = await findByText("Produto 2")
    const product2_price = await findByText("R$ 2")
    const images = await findAllByRole("img")

    expect(product1_title).toBeInTheDocument()
    expect(product1_price).toBeInTheDocument()
    expect(images[0]).toBeInTheDocument()
    expect(images[0]).toHaveAttribute('src', 'imagem1.jpg')
    expect(product2_title).toBeInTheDocument()
    expect(product2_price).toBeInTheDocument()
    expect(images[1]).toBeInTheDocument()
    expect(images[1]).toHaveAttribute('src', 'imagem2.jpg')
  });

  // test(("Verifica se quando clica no botão ver mais do produto redireciona para uma página com todas as informações do produto"), async () => {
  //   const { getByRole } = render(
  //     <MemoryRouter>
  //       <Card 
  //         id={1} 
  //         title={"Produto 1"} 
  //         price={1} 
  //         description={"Descrição 1"}
  //         category={"Categoria do Produto 1"} 
  //         image={"imagem1.jpg"}/>
  //     </MemoryRouter>
  //   )

  //   const button = getByRole('button')
  //   await userEvent.click(button)
    
  //   const url = window.location.pathname
  //   expect(url).toEqual("produto/1")
  // })

  test(('Verifica se o nome do usuário logado está aparecendo na tela'), async () => {
    const user = {
      uid: "1A@B3C",
      id: "1",
      name: "Claudinha",
      email: "claudinha@gmail.com",
    }

    function addUser() {}
    function updateDataUser() {}

    const { findByText } = render(
      <MemoryRouter>
        <UserContext.Provider value={{user, addUser, updateDataUser}}>
          <Name />
        </UserContext.Provider>
      </MemoryRouter>
    )

    const paragraph = await findByText(`Olá, ${user.name}!`)
    expect(paragraph).toBeInTheDocument()
  })
});