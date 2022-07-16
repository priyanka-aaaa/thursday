import Head from "next/head";
import Image from "next/image";


import Header from "./components/Header";
import LeftNavbar from "./components/LeftNavbar";

export default function Home() {
	return (
		<div className="container">
			<Head>
				<title>Create dashboard</title>
				<meta name="description" content="Created by streamline" />
				<link rel="icon" href="/pro.ico" />
			</Head>
			<div className="container">
				<LeftNavbar />
				<Header />
			<div class="dashboard-content">
				ggggggggggggggggggggg</div>
			</div>
		</div>
	);
}
