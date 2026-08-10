import { useCallback, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import ComplaintForm from './components/ComplaintForm'
import ComplaintList from './components/ComplaintList'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import { createComplaint, deleteComplaint, getComplaints, updateComplaint } from './services/complaintService'

function ComplaintManager() {
  const [complaints, setComplaints] = useState([]), [filters, setFilters] = useState({ wasteType: '', status: '' }), [editing, setEditing] = useState(null), [loading, setLoading] = useState(true), [saving, setSaving] = useState(false), [error, setError] = useState('')
  const loadComplaints = useCallback(async (activeFilters) => { setLoading(true); setError(''); try { setComplaints(await getComplaints(activeFilters)) } catch (requestError) { setError(requestError.response?.data?.message || 'Unable to load complaints. Make sure the API server is running.') } finally { setLoading(false) } }, [])
  useEffect(() => { loadComplaints(filters) }, [filters, loadComplaints])
  async function saveComplaint(values) { setSaving(true); setError(''); try { if (editing) await updateComplaint(editing._id, values); else await createComplaint(values); setEditing(null); await loadComplaints(filters) } catch (requestError) { setError(requestError.response?.data?.message || 'Unable to save the complaint. Please check all fields.') } finally { setSaving(false) } }
  async function removeComplaint(id) { if (!window.confirm('Delete this complaint?')) return; try { await deleteComplaint(id); await loadComplaints(filters) } catch (requestError) { setError(requestError.response?.data?.message || 'Unable to delete the complaint.') } }
  function filterChange(field, value) { setFilters((current) => ({ ...current, [field]: value })) }
  return <>{error && <div className="mx-auto mt-6 max-w-4xl rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">{error}</div>}<ComplaintForm complaint={editing} onSubmit={saveComplaint} onCancel={() => setEditing(null)} saving={saving}/><ComplaintList complaints={complaints} filters={filters} onFilterChange={filterChange} onEdit={(complaint) => { setEditing(complaint); document.querySelector('#complaint-form')?.scrollIntoView({ behavior: 'smooth' }) }} onDelete={removeComplaint} loading={loading}/></>
}

export default function App() {
  const [points, setPoints] = useState(0), [activities, setActivities] = useState([])
  function addPoints(value, activity) { setPoints((current) => current + value); setActivities((current) => [`${activity} (+${value})`, ...current]) }
  return <><Header/><main id="top"><Routes><Route path="/" element={<><HomePage points={points} activities={activities} addPoints={addPoints}/><ComplaintManager/></>}/><Route path="/complaints" element={<ComplaintManager/>}/><Route path="*" element={<><HomePage points={points} activities={activities} addPoints={addPoints}/><ComplaintManager/></>}/></Routes></main><Footer/></>
}
