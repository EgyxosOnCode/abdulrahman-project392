import React, { useState, useEffect } from "react";
import "./Meetings.css";

const Meetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [notifications, setNotifications] = useState(
    JSON.parse(localStorage.getItem("notifications")) ?? true
  );

  // جلب الاجتماعات من ملف JSON
  useEffect(() => {
    fetch("/meetings.json")
      .then((response) => response.json())
      .then((data) => setMeetings(data))
      .catch((error) => console.error("Error loading meetings:", error));
  }, []);

  // تحديث حالة الإشعارات وتخزينها في localStorage
  const toggleNotifications = () => {
    setNotifications((prev) => {
      const newState = !prev;
      localStorage.setItem("notifications", JSON.stringify(newState));
      return newState;
    });
  };

  // طلب إذن الإشعارات عند تحميل الصفحة لأول مرة
  useEffect(() => {
    if (notifications && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, [notifications]);

  // التحقق من الاجتماعات القادمة وإرسال إشعار عند وقتها
  useEffect(() => {
    if (!notifications || Notification.permission !== "granted") return;

    const checkMeetings = () => {
      const now = new Date();
      meetings.forEach((meeting) => {
        const meetingTime = new Date(`${meeting.date}T${meeting.time}`);
        const diff = meetingTime - now;

        // إرسال إشعار قبل 5 دقائق من وقت الاجتماع
        if (diff > 0 && diff <= 5 * 60 * 1000) {
          new Notification("Meeting Reminder", {
            body: `Your meeting "${meeting.name}" is about to start!`,
            icon: "/notification-icon.png",
          });
        }
      });
    };

    // التحقق كل دقيقة
    const interval = setInterval(checkMeetings, 60 * 1000);
    return () => clearInterval(interval);
  }, [meetings, notifications]);

  return (
    <div className="meetings-container">
      <div className="header">
        <h2 className="title">Upcoming Meetings</h2>

        {/* زر تفعيل/تعطيل الإشعارات */}
        <div className="notification-toggle">
          <label>
            <input
              type="checkbox"
              checked={notifications}
              onChange={toggleNotifications}
            />
            Notifications
          </label>
        </div>
      </div>

      <div className="meetings-list">
        {meetings.length > 0 ? (
          meetings.map((meeting, index) => (
            <div key={index} className="meeting-card">
              <h3>{meeting.name}</h3>
              <p><strong>Date:</strong> {meeting.date}</p>
              <p><strong>Time:</strong> {meeting.time}</p>
              <p><strong>Location:</strong> {meeting.location}</p>
              <p>{meeting.description}</p>
            </div>
          ))
        ) : (
          <p>No upcoming meetings</p>
        )}
      </div>
    </div>
  );
};

export default Meetings;
