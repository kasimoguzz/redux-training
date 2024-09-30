import { useParams, Navigate } from 'react-router-dom';
import EditForm from './EditForm';
import { useSelector } from 'react-redux';
import { contactSelectors } from '../../redux/contactSlice';

function Edit() {
    const { id } = useParams();
    
    const contact = useSelector((state) => contactSelectors.selectById(state, id));

    if (!contact) {
        return <Navigate to="/" />;  // Redirect yerine Navigate kullanılıyor
    }

    return (
        <div>
            <EditForm contact={contact} />
        </div>
    );
}

export default Edit;
