import React from 'react';
import instance from '../utils/axios';
import { User } from '../contexts/userAuth';
import styles from "./Profile.module.css";
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { capitalize } from '@mui/material';

function dateFormat(expiredAt: any) {
	try {
		if (!expiredAt) {
			throw new Error("Error");
		}
		const date = new Date(expiredAt);
		const formattedDate = new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false,
			timeZone: 'UTC'
		}).format(date);
		return formattedDate;
	} catch (error) {
		return null;
	}
}

const Profile: React.FC = () => {
	const [user, setUser] = React.useState<User | null>(null)

	const fetchUser = async () => {
        try {
            const response = await instance.get("/protected");
            setUser(response.data?.user);
        } catch (error) {
            console.error("Error fetching user:", error);
        } finally {
			// ignore ...
        }
    };

	React.useEffect(() => {
		fetchUser();
	}, []);

	function logout() {
		instance.post("/logout").then(response => {
			localStorage.removeItem("access_token");
			window.location.href = '/';
		});
	}

	return (
		<div className={classNames(styles.pageContainer, styles.center)}>
			<div className={classNames("card p-4", styles.card)}>
				<div className=" image d-flex flex-column justify-content-center align-items-center">
					<img src="./avatar.png" height="100" width="100" />
					<h3 style={{ whiteSpace: "nowrap", marginTop: 15 }}>{user?.username}</h3>
					<span className="idd" style={{ whiteSpace: "nowrap" }}>{user?.email}</span>
					<div className="d-flex flex-row justify-content-center align-items-center gap-2">
						<span className="idd1">- {capitalize(user?.role as string)} -</span>
						<span><i className="fa fa-copy"></i></span>
					</div>
					<div className=" px-2 rounded mt-4 date " style={{ whiteSpace: "nowrap" }}> Since ({dateFormat(user?.created_at)}) </div>
					<a href="javascript:void(0)" onClick={logout}>logout</a>
					<hr />
					<strong style={{ whiteSpace: "nowrap" }}>Last Consulted Providers</strong>
					<ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", textAlign: "center" }}>
						{(user?.providers || []).map((row, index) => (
							<li key={index}>
								<Link style={{ whiteSpace: "nowrap" }} to={`/providers/${row.id}`}>{row.company_name} ({row.activities})</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Profile;