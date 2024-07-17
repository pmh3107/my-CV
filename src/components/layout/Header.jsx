import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NavItem = ({ to, pages }) => {
	const location = useLocation();
	const isActive = location.pathname === to;
	return (
		<li className={`navbar__item ${isActive ? "active" : ""}`}>
			<Link to={to}>{pages}</Link>
		</li>
	);
};

function Header() {
	const [isActive, setIsActive] = useState(false);

	const toggleNavbar = () => {
		setIsActive(!isActive);
	};

	return (
		<header>
			<div className="container">
				<div className="header__inner">
					<div className="header__left">
						<div className="header__left-dot"></div>
						<Link to="/">
							<p className="header__left-name">
								<strong className="header__left-name-hl">Phan Minh Hien</strong>{" "}
								/ Web Developer
							</p>
						</Link>
					</div>
					<nav className="header__nav">
						<div
							className={`navbar__icon ${isActive ? "active" : ""}`}
							onClick={toggleNavbar}
							aria-label="Toggle navigation"
							role="button"
						>
							<svg
								id="hamburger"
								className="navbar__icon-svg"
								viewBox="0 0 60 40"
							>
								<g
									stroke="#0050ff"
									strokeWidth="4"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path id="top-line" d="M10,10 L50,10 Z"></path>
									<path id="middle-line" d="M10,20 L50,20 Z"></path>
									<path id="bottom-line" d="M10,30 L50,30 Z"></path>
								</g>
							</svg>
						</div>
						<ul className={`navbar__list ${isActive ? "visible" : ""}`}>
							<NavItem to="/" pages="About me" />
							<NavItem to="/Resume" pages="Resume" />
							<NavItem to="/Project" pages="Project" />
							<NavItem to="/Contact" pages="Contact" />
						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
}

export default Header;
