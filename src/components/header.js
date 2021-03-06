import React, { useState } from "react"
import { Link } from "gatsby"
import { StaticImage, GatsbyImage } from "gatsby-plugin-image"
import { useFlexSearch } from "react-use-flexsearch"
import { slide as Menu } from "react-burger-menu"
import { useWindowSize } from "./useWindowSize/useWindowSize"

var styles = {
  bmBurgerButton: {
    position: "absolute",
    width: "1.8rem",
    height: "1.8rem",
    right: "1.25rem",
    top: "2.7rem",
  },
  bmBurgerBars: {
    background: "#9a2f09",
  },
  bmBurgerBarsHover: {
    background: "#9a2f09",
    opacity: 1,
  },
  bmCrossButton: {
    marginTop: "1rem",
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "#9a2f09",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "105%",
    marginTop: "-4rem",
  },
  bmMenu: {
    background: "#FFEBD6",
    padding: "3rem 1.5rem",
    fontSize: "1.15em",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    color: "#b8b7ad",
    display: "flex",
    flexDirection: "column",
  },
  bmItem: {
    display: "flex",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
  },
}

const Header = ({ searchData, layoutChildren }) => {
  const [sousMenu, setSousMenu] = useState(false)
  const [searchActive, setSearchActive] = useState(false)
  const [query, setQuery] = useState(null)
  const results = useFlexSearch(query, searchData.index, searchData.store)
  const [width] = useWindowSize()
  return (
    <>
      {width <= 640 ? null : (
        <div className="w-full flex flex-row flex-no-wrap justify-end items-center bg-beige bg-opacity-75 px-9">
          <Link
            to="/a-propos"
            className="font-serif text-xxs font-light text-rouille mr-2 mb-0"
          >
            À propos
          </Link>
          <Link
            to="/archives"
            className="font-serif text-xxs font-light text-rouille mr-2 mb-0"
          >
            Archives
          </Link>
          <div className="flex flex-row flex-no-wrap ml-2 pl-2 border-l border-rouille my-2">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/larmoiredepauline__/"
            >
              <StaticImage
                src="../images/instagram.svg"
                width={12}
                className="mx-1"
                quality={95}
                formats={["AUTO", "WEBP", "AVIF"]}
                alt="Instagram Logo"
              />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.pinterest.fr/larmoiredepauline/"
            >
              <StaticImage
                src="../images/pinterest.svg"
                width={12}
                className="mx-1"
                quality={95}
                formats={["AUTO", "WEBP", "AVIF"]}
                alt="Pinterest Logo"
              />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.facebook.com/profile.php?id=100072022658768"
            >
              <StaticImage
                src="../images/facebook.svg"
                width={12}
                className="mx-1"
                quality={95}
                formats={["AUTO", "WEBP", "AVIF"]}
                alt="Facebook Logo"
              />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.tiktok.com/@larmoiredepauline"
            >
              <StaticImage
                src="../images/tik-tok.svg"
                width={12}
                className="ml-1"
                quality={95}
                formats={["AUTO", "WEBP", "AVIF"]}
                alt="Tiktok Logo"
              />
            </a>
          </div>
        </div>
      )}

      <header className="flex flex-row flex-no-wrap justify-between items-center w-full sm:px-9 sm:my-9 px-0 my-0">
        <div className="sm:w-2/12 w-30/100 flex justify-start items-center ml-2 sm:ml-0">
          <Link to="/">
            <StaticImage
              src="../images/logo-fond-blanc.png"
              width={190}
              quality={100}
              formats={["AUTO", "WEBP", "AVIF"]}
              alt="Logo L'armoire de Pauline"
            />
          </Link>
        </div>
        {width <= 640 ? (
          <Menu
            customBurgerIcon={
              <StaticImage
                src="../images/menu.svg"
                width={12}
                className="mx-1"
                quality={95}
                formats={["AUTO", "WEBP", "AVIF"]}
                alt="Burger icon"
              />
            }
            right
            width={280}
            styles={styles}
          >
            <div className="relative w-full flex-col items-end py-3">
              <Link to="/outfits">
                <p className="text-black font-sans-serif text-sm uppercase mb-0">
                  Outfits
                </p>
              </Link>
              <Link to="/mode">
                <p className="text-black font-sans-serif text-sm uppercase mb-0">
                  Mode
                </p>
              </Link>
              <Link to="/beaute">
                <p className="text-black font-sans-serif text-sm uppercase mb-0">
                  Beauté
                </p>
              </Link>
              <Link to="/lifestyle">
                <p className="text-black font-sans-serif text-sm uppercase mb-0">
                  Lifestyle
                </p>
              </Link>
              <Link to="/food">
                <p className="text-black font-sans-serif text-sm uppercase mb-0">
                  Food
                </p>
              </Link>
              <Link to="/voyages">
                <p className="text-black font-sans-serif text-sm uppercase mb-0">
                  Voyages
                </p>
              </Link>
              <Link to="/wishlist">
                <p className="text-black font-sans-serif text-sm uppercase mb-0">
                  Wishlist
                </p>
              </Link>
              <Link to="/derniers-achats">
                <p className="text-black font-sans-serif text-sm uppercase mb-0">
                  Derniers achats
                </p>
              </Link>
            </div>
            <div className="relative">
              <input
                onChange={element => setQuery(element.target.value)}
                className="w-full bg-beige border-b border-rouille text-black font-sans-serif text-xs"
                placeholder="Rechercher"
                type="text"
                value={query ? query : ""}
              />
              <button
                onClick={() => {
                  setQuery(null)
                }}
                className="absolute right-0 top-1/5 cursor-pointer"
              >
                &times;
              </button>
            </div>
            <div className="w-full flex flex-row items-center my-3 justify-end">
              <Link
                to="/a-propos"
                className="font-serif text-xxs font-light text-rouille mr-2 mb-0"
              >
                À propos
              </Link>
              <Link
                to="/archives"
                className="font-serif text-xxs font-light text-rouille mr-2 mb-0"
              >
                Archives
              </Link>
            </div>
            <div className="flex flex-row justify-end">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/larmoiredepauline__/"
              >
                <StaticImage
                  src="../images/instagram.svg"
                  width={12}
                  className="mx-1"
                  quality={95}
                  formats={["AUTO", "WEBP", "AVIF"]}
                  alt="Instagram Logo"
                />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.pinterest.fr/larmoiredepauline/"
              >
                <StaticImage
                  src="../images/pinterest.svg"
                  width={12}
                  className="mx-1"
                  quality={95}
                  formats={["AUTO", "WEBP", "AVIF"]}
                  alt="Pinterest Logo"
                />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/profile.php?id=100072022658768"
              >
                <StaticImage
                  src="../images/facebook.svg"
                  width={12}
                  className="mx-1"
                  quality={95}
                  formats={["AUTO", "WEBP", "AVIF"]}
                  alt="Facebook Logo"
                />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.tiktok.com/@larmoiredepauline"
              >
                <StaticImage
                  src="../images/tik-tok.svg"
                  width={12}
                  className="ml-1"
                  quality={95}
                  formats={["AUTO", "WEBP", "AVIF"]}
                  alt="Tiktok Logo"
                />
              </a>
            </div>
          </Menu>
        ) : (
          <div
            className={`${
              searchActive === true ? "w-10/12 lg:w-6/12" : "w-9/12 lg:w-5/12"
            } flex flex-row flexwrap justify-between items-center mr-1`}
          >
            <Link to="/outfits">
              <svg
                className="transition duration-300 ease-in-out opacity-80 hover:opacity-100"
                id="outfits"
                enableBackground="new 0 0 511.98 511.98"
                height="28"
                viewBox="0 0 511.98 511.98"
                width="28"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <g>
                    <path
                      d="m430.74 199.898s73.74 76.3 73.74 193.25c0 0-64.18 23.43-161.89 23.43-38.41 0-71.65-3.62-97.83-8.02-40.42-6.78-64.06-15.41-64.06-15.41 0-116.95 73.74-193.25 73.74-193.25v-47.7l-39.76-32.65-33.98-27.9 64.89-58.17c7.95-7.13 17.76-11.02 27.73-11.69 4.65-.31 9.32.08 13.87 1.17 7.35 1.76 14.34 5.35 20.28 10.75l6.92 6.3c15.98 14.56 40.42 14.56 56.41 0l6.92-6.3c5.94-5.4 12.93-8.99 20.28-10.75 14.31-3.43 29.94.07 41.59 10.52l64.89 58.17-73.74 60.55z"
                      fill="#FFEBD6"
                    />
                    <g fill="#FFEBD6">
                      <path d="m277.19 117.5v87.029s-30.1 91.44-30.1 136.16c0 17.8-1.06 43.45-2.33 67.87-40.42-6.78-64.06-15.41-64.06-15.41 0-116.95 73.74-193.25 73.74-193.25v-94.24h10.909c6.54-.001 11.841 5.301 11.841 11.841z" />
                      <path d="m273.321 21.788c-22.6 21.05-48.8 65.34-58.64 97.76l-33.98-27.9 64.89-58.17c7.95-7.13 17.76-11.02 27.73-11.69z" />
                      <path d="m398 22.958c-2.39 11.25-21.13 93.96-55.41 105.97-34.28-12.01-53.01-94.72-55.4-105.97 7.35 1.76 14.34 5.35 20.28 10.75l6.92 6.3c15.98 14.56 40.42 14.56 56.41 0l6.92-6.3c5.94-5.4 12.93-8.99 20.28-10.75z" />
                    </g>
                    <g>
                      <path
                        d="m282.066 312.922c-79.769-4.166-159.537-4.166-239.306 0-16.21.847-29.523 13.141-31.58 29.242-4.933 38.612-4.933 77.223 0 115.835 2.057 16.101 15.37 28.396 31.58 29.242 79.769 4.166 159.537 4.166 239.306 0 16.21-.847 29.523-13.141 31.58-29.242 4.933-38.612 4.933-77.223 0-115.835-2.058-16.101-15.371-28.395-31.58-29.242z"
                        fill="#9a2f09"
                      />
                      <path
                        d="m57.31 487.954c-4.85-.22-9.7-.46-14.55-.71-16.21-.85-29.52-13.14-31.58-29.25-4.93-38.61-4.93-77.22 0-115.83 2.06-16.1 15.37-28.4 31.58-29.24 4.85-.25 9.7-.49 14.55-.71-10.29 5.09-17.77 15.07-19.3 27.06-5.18 40.54-5.18 81.08 0 121.61 1.53 11.99 9.01 21.97 19.3 27.07z"
                        fill="#9a2f09"
                      />
                      <path
                        d="m313.64 393.333c-2.054 16.1-15.367 28.391-31.577 29.235-79.765 4.175-159.53 4.175-239.307 0-16.211-.844-29.523-13.135-31.578-29.235-1.082-8.476-1.921-16.953-2.542-25.429-1.492 21.024-1.525 42.048-.092 63.072 6.036 9.147 16.188 15.271 27.743 15.873 84.089 4.4 168.166 4.4 252.244 0 11.56-.602 21.716-6.731 27.75-15.884 1.433-21.036 1.399-42.071-.096-63.106-.61 8.491-1.45 16.983-2.545 25.474z"
                        fill="#9a2f09"
                      />
                      <path
                        d="m202.8 448.832c-24.108 1.319-48.215 1.319-72.323 0-10.551-.577-18.962-8.928-19.811-19.46-1.165-14.456-1.165-28.912 0-43.368.849-10.532 9.26-18.883 19.81-19.46 24.108-1.319 48.215-1.319 72.323 0 10.55.577 18.962 8.928 19.81 19.46 1.165 14.456 1.165 28.912 0 43.368-.847 10.532-9.258 18.883-19.809 19.46z"
                        fill="#ffd064"
                      />
                      <path
                        d="m166.639 423.174c-9.865 0-19.848-.235-29.747-.698-.599-9.833-.599-19.743 0-29.576 9.899-.463 19.882-.698 29.747-.698 9.864 0 19.847.235 29.745.698.599 9.833.599 19.743 0 29.576-9.898.463-19.881.698-29.745.698z"
                        fill="#9a2f09"
                      />
                    </g>
                  </g>
                  <g>
                    <path d="m474.189 249.065c-15.283-27.933-30.476-45.984-35.949-52.095v-41.228l71-58.299c1.69-1.389 2.691-3.446 2.738-5.634.048-2.188-.863-4.287-2.492-5.747l-53.72-48.15c-3.084-2.764-7.826-2.504-10.591.579-2.765 3.084-2.505 7.826.579 10.591l47.211 42.316-54.722 44.933v-30.672c0-4.142-3.357-7.5-7.5-7.5s-7.5 3.358-7.5 7.5l-.004 87.897c-53.551 8.667-107.749 8.666-161.3-.002v-87.895c0-4.142-3.357-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v30.675l-54.726-44.936 58.383-52.337c8.589-7.702 19.681-10.903 30.355-9.635 2.198 9.442 7.246 29.247 14.998 48.977 12.738 32.421 27.596 51.803 44.16 57.606.803.281 1.641.422 2.479.422s1.677-.141 2.479-.422c16.564-5.803 31.423-25.185 44.164-57.605 7.739-19.693 12.781-39.446 14.988-48.911 6.608-.79 13.432.094 19.776 2.81 3.811 1.631 8.217-.136 9.847-3.943 1.631-3.808-.135-8.216-3.942-9.846-19.267-8.249-41.729-4.46-57.23 9.649l-6.921 6.3c-13.205 12.024-33.112 12.024-46.312 0l-6.92-6.3c-20.436-18.604-51.362-18.719-71.935-.269l-64.891 58.17c-1.63 1.46-2.54 3.56-2.492 5.747.047 2.188 1.048 4.245 2.738 5.634l71 58.299v41.222c-4.917 5.472-17.553 20.415-31.021 43.329-11.406-6.078-23.469-12.079-35.688-18.154-10.678-5.31-21.433-10.658-31.757-16.089 10.09-12.635 17.873-26.937 21.284-43.704 5.212-25.623-2.412-48.511-20.917-62.796-17.543-13.542-41.702-16.561-60.119-7.512-9.872 4.85-26.433 17.438-26.433 47.242 0 18.866 11.981 36.701 36.63 54.525 7.71 5.575 16.378 10.975 25.604 16.244-11.438 11.251-24.565 21.265-36.966 30.723-26.699 20.364-52.03 39.7-52.685 65.752-16.334 3.916-28.937 17.537-31.131 34.693-4.988 39.06-4.988 78.67 0 117.732 2.52 19.695 18.765 34.747 38.629 35.788 39.828 2.077 79.936 3.115 120.045 3.115 40.108 0 80.219-1.039 120.048-3.115 19.869-1.042 36.109-16.095 38.617-35.788 1.494-11.678 2.531-23.406 3.132-35.153 6.102.183 12.255.281 18.379.281 97.91 0 161.79-22.909 164.462-23.884 2.959-1.081 4.928-3.895 4.928-7.045.002-62.002-20.548-112.576-37.789-144.085zm-164.85-203.516c18.952 17.269 47.547 17.269 66.511.002l6.92-6.299c1.406-1.28 2.893-2.441 4.444-3.483-2.605 9.936-6.601 23.561-11.94 37.146-12.502 31.813-24.306 43.734-32.683 47.885-8.376-4.151-20.18-16.072-32.679-47.885-5.338-13.587-9.335-27.221-11.94-37.161 1.544 1.043 3.032 2.207 4.45 3.497zm-232.049 93.729c0-16.298 6.24-27.979 18.047-33.78 4.938-2.426 10.581-3.603 16.389-3.603 9.706 0 19.87 3.289 27.95 9.526 8.113 6.262 20.899 20.817 15.384 47.932-3.023 14.864-10.419 27.795-20.071 39.388-32.415-18.165-57.699-37.45-57.699-59.463zm-34.141 181.137c13.369-.694 26.743-1.274 39.751-1.724 4.14-.144 7.379-3.615 7.235-7.755-.144-4.141-3.589-7.367-7.755-7.236-10.608.367-21.459.824-32.351 1.354 1.932-18.254 22.822-34.203 46.625-52.357 13.983-10.666 28.827-21.988 41.586-35.099 11.493 6.125 23.493 12.093 35.312 17.97 11.83 5.883 23.756 11.814 35.067 17.849-7.43 14.117-14.737 30.545-20.785 49.053-25.23-.281-50.418-.172-75.418.377-4.142.091-7.425 3.521-7.334 7.663s3.504 7.459 7.662 7.333c55.91-1.227 112.749-.361 168.938 2.572 12.616.654 22.928 10.2 24.52 22.702 1.053 8.231 1.863 16.488 2.457 24.759-.606 8.3-1.429 16.54-2.457 24.512-1.591 12.492-11.906 22.033-24.532 22.688-16.982.887-34.042 1.578-50.861 2.083.36-10.591.127-21.226-.722-31.757-1.147-14.244-12.702-25.571-26.876-26.346-24.269-1.328-48.879-1.329-73.142 0-14.175.775-25.729 12.102-26.877 26.346-.855 10.611-1.086 21.328-.714 32-19.751-.526-39.663-1.296-59.329-2.326-12.622-.654-22.938-10.195-24.528-22.691-1.006-7.878-1.831-16.091-2.459-24.419.594-8.301 1.404-16.588 2.459-24.849 1.598-12.5 11.914-22.048 24.528-22.702zm178.669-59.722c24.297 13.904 43.929 28.449 50.526 44.262-22.866-1.092-45.817-1.849-68.761-2.26 5.407-15.657 11.769-29.734 18.235-42.002zm-6.683 168.076c-.548 6.801-6.027 12.206-12.744 12.574-.001 0-.001 0-.001 0-23.723 1.298-47.778 1.298-71.503 0-6.717-.368-12.196-5.773-12.744-12.574-1.127-13.988-1.127-28.174 0-42.162.548-6.801 6.027-12.206 12.745-12.574 11.861-.649 23.806-.974 35.751-.974s23.89.325 35.752.974c6.717.368 12.196 5.773 12.744 12.574 1.127 13.988 1.127 28.174 0 42.162zm66.545 50.987c-79.139 4.126-159.39 4.126-238.526 0-12.616-.662-22.935-10.213-24.533-22.71-1.654-12.954-2.728-25.971-3.248-39.007 6.986 7.004 16.483 11.472 26.996 12.017 20.261 1.062 40.787 1.85 61.132 2.379 2.199 13.068 13.22 23.156 26.567 23.886 12.134.664 24.353.996 36.571.996s24.438-.332 36.57-.996c13.429-.735 24.5-10.942 26.604-24.125 17.395-.511 35.059-1.221 52.635-2.14 10.519-.545 20.02-5.016 27.007-12.022-.521 13.038-1.597 26.058-3.254 39.015-1.592 12.496-11.905 22.045-24.521 22.707zm190.685-85.295c-1.543-22.547-4.394-45.012-8.504-66.906-.764-4.071-4.68-6.75-8.755-5.987-4.071.764-6.752 4.684-5.987 8.755 4.139 22.051 6.956 44.702 8.42 67.423-5.775 1.183-12.323 2.412-19.57 3.608-.907-30.162-4.126-60.195-9.604-89.401-.764-4.071-4.684-6.75-8.754-5.989-4.071.764-6.752 4.683-5.988 8.754 5.443 29.027 8.602 58.898 9.409 88.892-22.363 3.069-49.673 5.467-80.443 5.467-5.949 0-11.926-.094-17.854-.271.424-22.572-.789-45.17-3.656-67.585-2.249-17.661-15.534-31.573-32.57-35.012-5.506-22.918-29.036-41.328-59.365-58.636 11.987-20.289 23.202-33.975 28.099-39.59 28.328 4.714 56.839 7.078 85.35 7.078 28.509 0 57.018-2.363 85.345-7.077 5.628 6.436 19.559 23.452 33.336 48.733 15.786 28.966 34.51 74.878 35.649 131.04-4.878 1.539-13.242 4.002-24.558 6.704z" />
                    <path d="m196.735 385.408c-10.018-.469-20.143-.706-30.096-.706-9.954 0-20.08.237-30.098.706-3.826.179-6.902 3.212-7.136 7.036-.615 10.114-.615 20.372 0 30.487.233 3.824 3.31 6.857 7.136 7.036 10.01.468 20.137.706 30.098.706 9.96 0 20.086-.237 30.096-.706 3.826-.179 6.902-3.212 7.136-7.036.615-10.115.615-20.372 0-30.487-.233-3.823-3.309-6.857-7.136-7.036zm-7.523 29.858c-15.075.541-30.073.541-45.146 0-.161-5.045-.161-10.111 0-15.156 15.083-.542 30.063-.542 45.146 0 .161 5.045.161 10.111 0 15.156z" />
                  </g>
                </g>
              </svg>
            </Link>
            <p className="mb-1 opacity-25">&#124;</p>
            <div className="cursor-pointer">
              <button
                onMouseLeave={() => setSousMenu(false)}
                onMouseOver={() => setSousMenu(true)}
                onFocus={() => setSousMenu(true)}
                className="relative text-black font-sans-serif text-xs uppercase mb-0"
              >
                Shopping
                {sousMenu && (
                  <div className="w-64 absolute top-full mt-0 -left-140% flex flex-row flex-no-wrap bg-beige px-2 py-1 justify-center">
                    <Link
                      to="/wishlist"
                      className="text-black font-sans-serif text-xs uppercase mb-0 mr-2 hover:text-rouille"
                    >
                      Wishlist
                    </Link>
                    <Link
                      to="/derniers-achats"
                      className="text-black font-sans-serif text-xs uppercase mb-0 ml-2 hover:text-rouille"
                    >
                      Derniers achats
                    </Link>
                  </div>
                )}
              </button>
            </div>
            <Link to="/mode">
              <p className="text-black font-sans-serif text-xs uppercase mb-0">
                Mode
              </p>
            </Link>
            <Link to="/beaute">
              <p className="text-black font-sans-serif text-xs uppercase mb-0">
                Beauté
              </p>
            </Link>
            <Link to="/lifestyle">
              <p className="text-black font-sans-serif text-xs uppercase mb-0">
                Lifestyle
              </p>
            </Link>
            <Link to="/food">
              <p className="text-black font-sans-serif text-xs uppercase mb-0">
                Food
              </p>
            </Link>
            <Link to="/voyages">
              <p className="text-black font-sans-serif text-xs uppercase mb-0">
                Voyages
              </p>
            </Link>
            {searchActive === true ? (
              <div className="relative">
                <input
                  onChange={element => setQuery(element.target.value)}
                  className="ml-2 w-32 border-b border-rouille text-black font-sans-serif text-xs"
                  placeholder="Rechercher"
                  type="text"
                />
                <button
                  onClick={() => {
                    setQuery(null)
                    setSearchActive(false)
                  }}
                  className="absolute right-0 top-1/5 cursor-pointer"
                >
                  &times;
                </button>
              </div>
            ) : (
              <StaticImage
                onClick={() => setSearchActive(true)}
                src="../images/loupe.svg"
                width={20}
                height={20}
                className="ml-2 cursor-pointer"
                quality={95}
                layout="fixed"
                formats={["AUTO", "WEBP", "AVIF"]}
                alt="Loupe recherche"
              />
            )}
          </div>
        )}
      </header>
      {width <= 640 ? null : (
        <div className="mx-9 border-b border-rouille border-opacity-25"></div>
      )}
      {results.length === 0 ? (
        <div className="sm:px-9 sm:mt-6 sm:mb-12 w-full ">
          <main>{layoutChildren}</main>
        </div>
      ) : (
        <div className="sm:px-9 sm:mt-6 sm:mb-12 w-full">
          <h2 className="text-3xl font-sans-serif font-thin text-center text-rouille m-0 mt-3 sm:mt-0">
            {results.length} résultat(s) pour "{query}"
          </h2>
          <div className="w-10/12 mx-auto sm:w-full grid sm:grid-cols-4 grid-cols-1 sm:gap-6 mt-6">
            {results.map((article, key) => {
              return (
                <Link
                  className="imageContainer relative flex flex-col"
                  key={key}
                  to={`/${article.categorySlug}${article.uri}`}
                >
                  <div className="h-full">
                    <GatsbyImage
                      className="imageWithoutFullHeight h-80/100"
                      alt={article.featuredImage.node.altText}
                      image={
                        article.featuredImage.node.localFile.childImageSharp
                          .gatsbyImageData
                      }
                    ></GatsbyImage>
                    <p className="text-black font-light font-sans-serif text-xl mx-0 mb-0 mt-3">
                      {article.title}
                    </p>
                    <div className="flex flex-row flex-no-wrap justify-start items-center w-auto">
                      <p className="text-black opacity-50 font-normal font-sans-serif text-xxs ml-0 mb-0 mt-0 mr-2">
                        {article.date}
                      </p>
                      <div className="flex flex-row flex-no-wrap items-center">
                        <StaticImage
                          src="../images/comments-black.svg"
                          width={16}
                          height={16}
                          className="mr-1 opacity-50"
                          quality={100}
                          formats={["AUTO", "WEBP", "AVIF"]}
                          alt="Nombre de commentaires"
                        />
                        <p className="text-black opacity-50 font-normal font-sans-serif text-xxs m-0">
                          {article.commentCount ? article.commentCount : 0}
                        </p>
                      </div>
                    </div>
                    <p className="absolute top-0 shadow-sm right-0 px-3 bg-white text-black font-sans-serif uppercase text-xxs">
                      {article.category}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

export default Header
