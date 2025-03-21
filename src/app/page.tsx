"use client";
import Header from "@/components/header/Header";
import Selector from "@/components/selector/Selector";
import TextInput from "@/components/text-input/TextInput";

export default function Home() {
	return (
		<>
			<Header />
			<div id="app">
				<Selector />
				<div id="content">
					<section id="top">
						<TextInput />
						<p>result</p>
					</section>
					<section id="bottom">
						<p>explanation</p>
					</section>
				</div>
			</div>
		</>
	);
}
