import React, { useEffect, useState, useRef } from "react";
import "./Card.css";
import CircularProgressbar from "./CircularProgressbar";

function Card({ data }) {
  const [timer, setTimer] = useState({
    days: 0,
    hrs: 17,
    mins: 49,
    secs: 49,
  });

  const intervalRef = useRef(null);

  function getTimeRemaining(endTime) {
    const total = Date.parse(endTime) - Date.parse(new Date());
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hrs = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((total / 1000 / 60) % 60);
    const secs = Math.floor((total / 1000) % 60);

    console.log(total);

    return {
      total,
      days,
      hrs,
      mins,
      secs,
    };
  }

  function startTimer(deadline) {
    let { total, days, hrs, mins, secs } = getTimeRemaining(deadline);

    console.log(deadline.getHours());

    if (total >= 0) {
      setTimer({
        days,
        hrs,
        mins,
        secs,
      });
      let timer = { days, hrs, mins, secs };
      window.sessionStorage.setItem("timer", JSON.stringify(timer));
    } else {
      window.sessionStorage.removeItem("timer");
      clearInterval(intervalRef.current);
    }
  }

  function clearTimer(endTime) {
    setTimer({
      days: 0,
      hrs: 17,
      mins: 49,
      secs: 49,
    });

    if (intervalRef.current) clearInterval(intervalRef.current);

    const id = setInterval(() => {
      startTimer(endTime);
    }, 1000);

    intervalRef.current = id;
  }

  function getDeadlineTime() {
    let deadline = new Date();
    if (window.sessionStorage.getItem("timer")) {
      let timer = JSON.parse(window.sessionStorage.getItem("timer"));
      let hrs = timer.hrs;
      let mins = timer.mins;
      let secs = timer.secs;
      deadline.setHours(deadline.getHours() + hrs);
      deadline.setMinutes(deadline.getMinutes() + mins);
      deadline.setSeconds(deadline.getSeconds() + secs);
      console.log(timer.hrs);
    } else {
      deadline.setHours(deadline.getHours() + 16);
      deadline.setMinutes(deadline.getMinutes() + 49);
      deadline.setSeconds(deadline.getSeconds() + 49);
    }

    return deadline;
  }

  useEffect(() => {
    clearTimer(getDeadlineTime());
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return data
      .slice(0)
      .reverse()
      .map((plan, index) => {
        return (
          <div className="card-container">
            <div className={`section-1 ${plan.saver}`}>
              <div className="heading">flat {plan.save} off</div>
              <div className="offer-status-and-percentage-container">
                {plan.saver === "Weekly Plan" ? (
                  <div className="offer-status-container">
                    <div className="offer-status">Offer Closed</div>
                    <div className="offer-status-text">
                      Weekend Plan Booked 100% Within 20 Minutes
                    </div>
                  </div>
                ) : (
                  <div className="offer-status-container">
                    <div className="offer-status">Offer ends in</div>
                    <div className="offer-timer">
                      <div className="days-container">
                        <div className="days">{timer.days}</div>
                        <span className="days-text">days</span>
                      </div>
                      <div className="hrs-container">
                        <div className="hrs">{timer.hrs}</div>
                        <span className="hrs-text">hrs</span>
                      </div>
                      <div className="mins-container">
                        <div className="mins">{timer.mins}</div>
                        <span className="mins-text">mins</span>
                      </div>
                      <div className="secs-container">
                        <div className="secs">{timer.secs}</div>
                        <span className="secs-text">secs</span>
                      </div>
                    </div>
                  </div>
                )}
                <div className="offer-booked-percentage">
                  {plan.saver === "Weekly Plan" ? (
                    <CircularProgressbar value="100" pathColor="#d22417" />
                  ) : (
                    <CircularProgressbar
                      value={
                        plan.saver === "VIP Pass"
                          ? "65"
                          : plan.saver === "Super Saver"
                          ? "75"
                          : "85"
                      }
                      pathColor="#1e4d8e"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className={`section-2 ${plan.saver}`}>
              <div className="saver-container">
                <div className={`saver ${plan.saver}`}>{plan.saver}</div>
              </div>
              <div className="heading">{plan.heading}</div>
              <div className="content">
                {plan.content.map((value) => {
                  return <div className="content-item">✔ {value}</div>;
                })}
              </div>
              <div className="suit">{plan.suit}</div>
              <div className="referral">
                Flat 30% OFF for being referred by Saurabh
              </div>
              <div className="price-container">
                <div className="new-price">
                  ₹
                  {parseInt(
                    parseInt(plan.originalPrice) -
                      (parseInt(plan.originalPrice) * parseInt(plan.save)) / 100
                  )}
                </div>
                <div className="save-percentage">Save {plan.save}</div>
                <div className="original-price">₹{plan.originalPrice}</div>
              </div>
              <div className={`buy-btn ${plan.saver}`}>
                {plan.saver === "Weekly Plan" ? "100% Booked" : "Buy Now"}
              </div>
            </div>
          </div>
        );
      })
}

export default Card;
