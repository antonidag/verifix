from gpt_researcher import GPTResearcher
from utils import embed_text
from db import solutions
from services.solution_service import generate_confidence_score, process_solution_report
from services.inventory_service import store_model_info
from db import solutions, questions

async def process_research_report(question: str, researcher: GPTResearcher, solution_id: str):
    """Process and save a research report."""
    try:
        # Update status to analyzing
        solutions.update(solution_id, {'status': 'analyzing'})
        await researcher.conduct_research()

        # Update status to processing
        solutions.update(solution_id, {'status': 'processing'})
        report = await researcher.write_report()

        # Update status to identifying
        solutions.update(solution_id, {'status': 'identifying'})
        solution_data = await process_solution_report(report)
        solution_data['text'] = report
        solution_data['verified'] = False

        # Update status to validating
        solutions.update(solution_id, {'status': 'validating'})
        solution_data['confidence'] = await generate_confidence_score(solution_data)

        # Store model info and create embeddings
        solutions.update(solution_id, {'status': 'storing'})
        inventory_id = await store_model_info(solution_data)
        solution_data['inventory_id'] = inventory_id

        embedding = embed_text(question)
        questions.create({
            'text': question,
            'solution_id': solution_id,
            'inventory_id': inventory_id,
            'embedding': embedding
        })

        # Update final status
        solution_data['status'] = 'complete'
        solutions.update(solution_id, solution_data)

    except Exception as e:
        print(f"Error in process_research_report: {str(e)}")
        solutions.update(solution_id, {
            'text': f"Error generating report: {str(e)}",
            'status': 'error',
            'error': True
        })
