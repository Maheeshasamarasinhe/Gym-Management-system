import React, { useState } from 'react';
import { Bell, Calendar, Utensils, CreditCard, User, Trash2, Check, CheckCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useGymData } from '../context/GymDataContext';

const ClientNotificationsPage = () => {
  const { user } = useAuth();
  const {
    getNotificationsForMember,
    markNotificationRead,
    markAllNotificationsRead,
    deleteNotification: deleteNotificationFromContext,
  } = useGymData();

  // Get notifications for the current logged-in member
  const notifications = getNotificationsForMember(user?.id);

  const [filter, setFilter] = useState('all');

  const typeConfig = {
    schedule: { icon: <Calendar size={20} />, color: '#f36100', label: 'Schedule' },
    nutrition: { icon: <Utensils size={20} />, color: '#f36100', label: 'Nutrition' },
    payment: { icon: <CreditCard size={20} />, color: '#f36100', label: 'Payment' },
    profile: { icon: <User size={20} />, color: '#f36100', label: 'Profile' },
  };

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'schedule', label: 'Schedule' },
    { key: 'nutrition', label: 'Nutrition' },
    { key: 'payment', label: 'Payment' },
    { key: 'profile', label: 'Profile' },
  ];

  const filteredNotifications = filter === 'all'
    ? notifications
    : notifications.filter(n => n.type === filter);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    markNotificationRead(id);
  };

  const markAllAsRead = () => {
    markAllNotificationsRead(user?.id);
  };

  const deleteNotification = (id) => {
    deleteNotificationFromContext(id);
  };

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Muli:wght@300;400;600;700&display=swap');

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .notification-card {
          animation: slideIn 0.3s ease-out backwards;
          transition: all 0.3s ease;
        }

        .notification-card:hover {
          border-left: 4px solid #f36100;
          background: #252525 !important;
        }

        .filter-btn {
          transition: all 0.2s ease;
        }

        .filter-btn:hover {
          background: #252525 !important;
          border-color: #f36100 !important;
        }

        .action-btn {
          transition: all 0.2s ease;
          opacity: 0;
        }

        .notification-card:hover .action-btn {
          opacity: 1;
        }
      `}</style>

      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>NOTIFICATIONS</h1>
          <p style={styles.subtitle}>Stay updated with changes to your plan</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllAsRead} style={styles.markAllBtn}>
            <CheckCheck size={18} />
            Mark all as read ({unreadCount})
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div style={styles.filterBar}>
        {filters.map(f => (
          <button
            key={f.key}
            className="filter-btn"
            onClick={() => setFilter(f.key)}
            style={{
              ...styles.filterBtn,
              ...(filter === f.key ? styles.filterBtnActive : {}),
            }}
          >
            {f.key !== 'all' && (
              <span style={{ color: typeConfig[f.key]?.color }}>{typeConfig[f.key]?.icon}</span>
            )}
            {f.key === 'all' && <Bell size={16} />}
            {f.label}
            {f.key === 'all' && unreadCount > 0 && (
              <span style={styles.badgeCount}>{unreadCount}</span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div style={styles.notificationsList}>
        {filteredNotifications.length === 0 ? (
          <div style={styles.emptyState}>
            <Bell size={48} color="#a9a9a9" />
            <div style={styles.emptyText}>No notifications</div>
          </div>
        ) : (
          filteredNotifications.map((notification, index) => {
            const config = typeConfig[notification.type];
            return (
              <div
                key={notification.id}
                className="notification-card"
                style={{
                  ...styles.notificationCard,
                  ...(notification.read ? {} : styles.notificationUnread),
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                <div style={{ ...styles.iconWrapper, background: `${config.color}20`, color: config.color }}>
                  {config.icon}
                </div>

                <div style={styles.notificationContent}>
                  <div style={styles.notificationHeader}>
                    <div style={styles.notificationTitle}>{notification.title}</div>
                    <div style={styles.typeBadge}>
                      <span style={{ ...styles.typeDot, background: config.color }} />
                      {config.label}
                    </div>
                  </div>
                  <div style={styles.notificationMessage}>{notification.message}</div>
                  <div style={styles.notificationTime}>{notification.time}</div>
                </div>

                <div style={styles.notificationActions}>
                  {!notification.read && (
                    <button
                      className="action-btn"
                      onClick={() => markAsRead(notification.id)}
                      style={styles.readBtn}
                      title="Mark as read"
                    >
                      <Check size={16} />
                    </button>
                  )}
                  <button
                    className="action-btn"
                    onClick={() => deleteNotification(notification.id)}
                    style={styles.deleteBtn}
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    fontFamily: "'Muli', sans-serif",
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '40px',
  },
  title: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '56px',
    color: '#fff',
    margin: '0',
    letterSpacing: '4px',
    textTransform: 'uppercase',
  },
  subtitle: { color: '#a9a9a9', fontSize: '18px', marginTop: '8px' },
  markAllBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    background: 'transparent',
    border: '1px solid #f36100',
    borderRadius: '0',
    color: '#f36100',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '16px',
    textTransform: 'uppercase',
  },
  filterBar: {
    display: 'flex',
    gap: '12px',
    marginBottom: '32px',
    flexWrap: 'wrap',
  },
  filterBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    background: '#0a0a0a',
    border: '1px solid #464646',
    borderRadius: '0',
    color: '#a9a9a9',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  filterBtnActive: {
    background: '#252525',
    border: '1px solid #f36100',
    color: '#f36100',
  },
  badgeCount: {
    background: '#f36100',
    color: '#fff',
    padding: '2px 8px',
    borderRadius: '0',
    fontSize: '12px',
    fontWeight: '700',
  },
  notificationsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  emptyState: {
    textAlign: 'center',
    padding: '80px 40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  emptyText: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '24px',
    color: '#a9a9a9',
    letterSpacing: '2px',
    textTransform: 'uppercase',
  },
  notificationCard: {
    display: 'flex',
    gap: '20px',
    padding: '24px',
    background: '#0a0a0a',
    border: '1px solid #464646',
    borderRadius: '0',
    alignItems: 'flex-start',
  },
  notificationUnread: {
    background: '#151515',
    border: '1px solid #464646',
    borderLeft: '3px solid #f36100',
  },
  iconWrapper: {
    width: '44px',
    height: '44px',
    borderRadius: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  notificationContent: { flex: 1 },
  notificationHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '8px',
  },
  notificationTitle: {
    fontWeight: '600',
    color: '#fff',
    fontSize: '16px',
  },
  typeBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '3px 10px',
    background: '#252525',
    borderRadius: '0',
    fontSize: '12px',
    color: '#a9a9a9',
  },
  typeDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
  },
  notificationMessage: {
    color: '#c4c4c4',
    fontSize: '14px',
    lineHeight: '1.6',
    marginBottom: '8px',
  },
  notificationTime: { color: '#a9a9a9', fontSize: '13px' },
  notificationActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flexShrink: 0,
  },
  readBtn: {
    background: 'none',
    border: '1px solid #f36100',
    color: '#f36100',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteBtn: {
    background: 'none',
    border: '1px solid #464646',
    color: '#a9a9a9',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default ClientNotificationsPage;
