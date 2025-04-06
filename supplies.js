document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:3000/api';
    const supplyModal = document.getElementById('supplyModal');
    const supplyForm = document.getElementById('supplyForm');
    const addSupplyBtn = document.getElementById('addSupplyBtn');
    const modalTitle = document.getElementById('modalTitle');
    let editSupplyId = null;

    // Função para carregar insumos
    const loadSupplies = async () => {
        try {
            const response = await fetch(`${apiUrl}/supplies`);
            if (!response.ok) throw new Error('Erro ao carregar insumos.');
            const supplies = await response.json();
            const tableBody = document.querySelector('#suppliesTable tbody');
            tableBody.innerHTML = '';

            supplies.forEach(supply => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${supply.name}</td>
                    <td>${supply.quantity}</td>
                    <td>${supply.unit}</td>
                    <td>${supply.category}</td>
                    <td>${supply.plantationId}</td>
                    <td>
                        <button class="editSupplyBtn" data-id="${supply.id}">Editar</button>
                        <button class="deleteSupplyBtn" data-id="${supply.id}">Deletar</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });

            document.querySelectorAll('.editSupplyBtn').forEach(button => {
                button.addEventListener('click', (e) => openEditSupplyModal(e.target.dataset.id));
            });

            document.querySelectorAll('.deleteSupplyBtn').forEach(button => {
                button.addEventListener('click', (e) => deleteSupply(e.target.dataset.id));
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    // Função para adicionar insumo
    const addSupply = async (supply) => {
        try {
            const response = await fetch(`${apiUrl}/supplies`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(supply),
            });
            if (!response.ok) throw new Error('Erro ao adicionar insumo.');
            loadSupplies();
        } catch (error) {
            console.error(error.message);
        }
    };

    // Função para atualizar insumo
    const updateSupply = async (id, supply) => {
        try {
            const response = await fetch(`${apiUrl}/supplies/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(supply),
            });
            if (!response.ok) throw new Error('Erro ao atualizar insumo.');
            loadSupplies();
        } catch (error) {
            console.error(error.message);
        }
    };

    // Função para deletar insumo
    const deleteSupply = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/supplies/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Erro ao deletar insumo.');
            loadSupplies();
        } catch (error) {
            console.error(error.message);
        }
    };

    // Abrir modal para editar insumo
    const openEditSupplyModal = async (id) => {
        try {
            editSupplyId = id;
            modalTitle.innerText = 'Editar Insumo';

            const response = await fetch(`${apiUrl}/supplies/${id}`);
            if (!response.ok) throw new Error('Erro ao carregar dados do insumo.');
            const supply = await response.json();

            document.getElementById('supplyName').value = supply.name;
            document.getElementById('quantity').value = supply.quantity;
            document.getElementById('unit').value = supply.unit;
            document.getElementById('category').value = supply.category;
            document.getElementById('plantationId').value = supply.plantationId;
            supplyModal.style.display = 'block';
        } catch (error) {
            console.error(error.message);
        }
    };

    // Abrir modal para adicionar novo insumo
    const openAddSupplyModal = () => {
        editSupplyId = null;
        modalTitle.innerText = 'Adicionar Insumo';
        supplyForm.reset();
        supplyModal.style.display = 'block';
    };

    // Fechar modal ao clicar no "x"
    document.querySelector('.close').addEventListener('click', () => {
        supplyModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === supplyModal) {
            supplyModal.style.display = 'none';
        }
    });

    // Submissão do formulário
    supplyForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const supplyData = {
            name: document.getElementById('supplyName').value,
            quantity: document.getElementById('quantity').value,
            unit: document.getElementById('unit').value,
            category: document.getElementById('category').value,
            plantationId: document.getElementById('plantationId').value,
        };

        if (editSupplyId) {
            await updateSupply(editSupplyId, supplyData);
        } else {
            await addSupply(supplyData);
        }

        supplyModal.style.display = 'none';
        loadSupplies();
    });

    addSupplyBtn.addEventListener('click', openAddSupplyModal);
    loadSupplies();
});