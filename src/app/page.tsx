"use client";
import ExplanationsList from "@/components/explanation-list/ExplanationsList";
import Header from "@/components/header/Header";
import LoginModal from "@/components/login-modal/LoginModal";
import PlansModal from "@/components/plans-modal/PlansModal";
import Selector from "@/components/selector/Selector";
import TextInput from "@/components/text-input/TextInput";
import TextOutput from "@/components/text-output/TextOutput";
import { getUser } from "@/lib/auth-session";
import checkUserTier from "@/server/checkUserTier";
import { useResultStore } from "@/stores/result.store";
import { useSettingsStore } from "@/stores/settings.store";
import { Splitter, theme } from "antd";
import { useEffect, useState } from "react";

const { useToken } = theme;

export default function Home() {
	const { token } = useToken();
	const { result, oldInput, startTime, endTime } = useResultStore();
	const { isMobile, setIsMobile, setShowLoginModal, showLoginModal } = useSettingsStore();
	const [user, setUser] = useState<Awaited<ReturnType<typeof getUser>>>(undefined);

	useEffect(() => {
		const fetchUser = async () => {
			const userData = await getUser();
			if (userData) {
				setShowLoginModal(false);
				checkUserTier();
			} else {
				setShowLoginModal(true);
			}
			setUser(userData);
		};
		fetchUser();
	}, [showLoginModal]);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div
			id="root"
			style={{ backgroundColor: token.colorBgContainer }}
			className={isMobile ? "mobile" : ""}
		>
			<Header user={user} />
			<LoginModal />
			<PlansModal />
			<div id="app" style={{ display: "flex", flexDirection: isMobile ? "column-reverse" : "row" }}>
				{isMobile ? (
					<>
						<Selector />
						<div id="content">
							<section id="top" style={{ flexDirection: "column" }}>
								<TextInput />
								<TextOutput
									originalText={oldInput}
									correctedText={result.correctedText}
									startTime={startTime}
									endTime={endTime}
								/>
							</section>
							<section id="bottom">
								<ExplanationsList explanations={result.explanations} />
							</section>
						</div>
					</>
				) : (
					<Splitter>
						<Splitter.Panel style={{ minWidth: "380px" }} defaultSize={400}>
							<Selector />
						</Splitter.Panel>
						<Splitter.Panel>
							<div id="content">
								<Splitter layout="vertical">
									<Splitter.Panel defaultSize="60%">
										<section id="top" style={{ flexDirection: "row" }}>
											<TextInput />
											<TextOutput
												originalText={oldInput}
												correctedText={result.correctedText}
												startTime={startTime}
												endTime={endTime}
											/>
										</section>
									</Splitter.Panel>
									<Splitter.Panel>
										<section id="bottom">
											<ExplanationsList explanations={result.explanations} />
										</section>
									</Splitter.Panel>
								</Splitter>
							</div>
						</Splitter.Panel>
					</Splitter>
				)}
			</div>
		</div>
	);
}
