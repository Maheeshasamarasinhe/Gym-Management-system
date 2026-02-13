import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Search, UserCheck, UserX } from 'lucide-react';
import { useGymData } from '../context/GymDataContext';

const AdminLandingPage = () => {
  const navigate = useNavigate();
  const { members, deleteMember: deleteFromSystem } = useGymData();
  const [searchTerm, setSearchTerm] = useState('');

  const handleDeleteMember = (e, memberId) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this member? This will remove all their data from the system.')) {
      deleteFromSystem(memberId);
    }
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMemberClick = (memberId) => {
    navigate(`/admin/members/${memberId}`);
  };

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Muli:wght@300;400;600;700&display=swap');
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .member-card {
          animation: slideIn 0.4s ease-out backwards;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .member-card:hover {
          transform: translateX(8px);
          border-left: 4px solid #f36100 !important;
          background: #252525 !important;
        }

        .delete-btn {
          transition: all 0.2s ease;
        }

        .delete-btn:hover {
          transform: scale(1.1);
          background: #f36100 !important;
          border-color: #f36100 !important;
          color: #fff !important;
        }

        .search-input {
          transition: all 0.3s ease;
        }

        .search-input:focus {
          border-color: #f36100 !important;
        }
      `}</style>

      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>MEMBERS DIRECTORY</h1>
          <p style={styles.subtitle}>Total Active: {members.filter(m => m.membership === 'active').length} / {members.length}</p>
        </div>
        
        <div style={styles.searchContainer}>
          <Search style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
            className="search-input"
          />
        </div>
      </div>

      <div style={styles.statsBar}>
        <div style={styles.statCard}>
          <UserCheck size={24} color="#f36100" />
          <div>
            <div style={styles.statNumber}>{members.filter(m => m.membership === 'active').length}</div>
            <div style={styles.statLabel}>Active</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <UserX size={24} color="#a9a9a9" />
          <div>
            <div style={styles.statNumber}>{members.filter(m => m.membership === 'inactive').length}</div>
            <div style={styles.statLabel}>Inactive</div>
          </div>
        </div>
      </div>

      <div style={styles.membersList}>
        {filteredMembers.map((member, index) => (
          <div
            key={member.id}
            className="member-card"
            style={{
              ...styles.memberCard,
              animationDelay: `${index * 0.1}s`
            }}
            onClick={() => handleMemberClick(member.id)}
          >
            <div style={styles.memberInfo}>
              <div style={styles.memberId}>{member.id}</div>
              <div style={styles.memberDetails}>
                <div style={styles.memberName}>{member.name}</div>
                <div style={styles.memberMeta}>
                  <span style={styles.planBadge}>{member.plan}</span>
                  <span style={styles.dateBadge}>Joined: {member.joinDate}</span>
                </div>
              </div>
            </div>

            <div style={styles.memberActions}>
              <span style={{
                ...styles.statusBadge,
                ...(member.membership === 'active' ? styles.activeBadge : styles.inactiveBadge)
              }}>
                {member.membership.toUpperCase()}
              </span>
              <button
                onClick={(e) => handleDeleteMember(e, member.id)}
                style={styles.deleteButton}
                className="delete-btn"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}

        {filteredMembers.length === 0 && (
          <div style={styles.emptyState}>
            <p style={styles.emptyText}>No members found matching your search.</p>
          </div>
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
    alignItems: 'center',
    marginBottom: '40px',
    animation: 'fadeIn 0.6s ease-out',
  },
  title: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '48px',
    color: '#fff',
    margin: '0',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  subtitle: {
    color: '#a9a9a9',
    fontSize: '16px',
    marginTop: '8px',
  },
  searchContainer: {
    position: 'relative',
    width: '400px',
  },
  searchIcon: {
    position: 'absolute',
    left: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#a9a9a9',
  },
  searchInput: {
    width: '100%',
    padding: '16px 20px 16px 56px',
    background: 'transparent',
    border: '1px solid #363636',
    borderRadius: '0',
    color: '#c4c4c4',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  statsBar: {
    display: 'flex',
    gap: '24px',
    marginBottom: '40px',
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    background: '#252525',
    padding: '20px 32px',
    borderRadius: '0',
    border: '1px solid #464646',
  },
  statNumber: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#fff',
    fontFamily: "'Oswald', sans-serif",
  },
  statLabel: {
    fontSize: '14px',
    color: '#a9a9a9',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  membersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  memberCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#0a0a0a',
    border: '1px solid #464646',
    borderRadius: '0',
    padding: '24px',
    cursor: 'pointer',
    borderLeft: '4px solid transparent',
  },
  memberInfo: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
  },
  memberId: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '28px',
    color: '#f36100',
    minWidth: '80px',
  },
  memberDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  memberName: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#fff',
  },
  memberMeta: {
    display: 'flex',
    gap: '12px',
  },
  planBadge: {
    padding: '4px 12px',
    background: '#252525',
    color: '#f36100',
    borderRadius: '0',
    fontSize: '13px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    border: '1px solid #464646',
  },
  dateBadge: {
    padding: '4px 12px',
    background: '#252525',
    color: '#a9a9a9',
    borderRadius: '0',
    fontSize: '13px',
    border: '1px solid #363636',
  },
  memberActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  statusBadge: {
    padding: '8px 20px',
    borderRadius: '0',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '1px',
  },
  activeBadge: {
    background: '#252525',
    color: '#f36100',
    border: '1px solid #f36100',
  },
  inactiveBadge: {
    background: '#252525',
    color: '#a9a9a9',
    border: '1px solid #464646',
  },
  deleteButton: {
    background: '#252525',
    border: '1px solid #464646',
    color: '#a9a9a9',
    padding: '12px',
    borderRadius: '0',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    padding: '60px',
    textAlign: 'center',
  },
  emptyText: {
    color: '#a9a9a9',
    fontSize: '18px',
  },
};

export default AdminLandingPage;
