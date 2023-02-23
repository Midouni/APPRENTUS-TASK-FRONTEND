import style from './expenses.module.css'
import { ExpensesTable, NewExpense } from '../../components'
import { Container } from '@mui/system';
import { useSelector } from 'react-redux';

function Expenses() {
    const { expensesData } = useSelector((state) => state.expenses)
    return (
        <div className={style.expenses}>
            <Container >
                <section id='newExpenseSection'>
                    <NewExpense />
                </section>
                <main>
                    <ExpensesTable data={expensesData} />
                </main>
            </Container>
        </div>
    )
}

export default Expenses