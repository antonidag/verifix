from gpt_researcher import GPTResearcher
from utils import embed_text
from db import solutions
from services.solution_service import generate_confidence_score, process_solution_report
from services.inventory_service import store_model_info
from db import solutions, questions

async def process_research_report(question: str, researcher: GPTResearcher, solution_id: str):
    """Process and save a research report."""
    try:
        solutions.update_status(solution_id, "researching", "Gathering releveant information...")
        await researcher.conduct_research()
        
        solutions.update_status(solution_id, "writing", "Writing detailed report...")
        report = await researcher.write_report()

        solutions.update_status(solution_id, "processing", "Analyzing problem context...")
        # Process report and extract data
        solution_data = await process_solution_report(report)
        
        # Ensure all required fields are present
        solution_data['text'] = report
        if not solution_data.get('description'):
            solution_data['description'] = 'Processing solution...'
        if not solution_data.get('solution_steps'):
            solution_data['solution_steps'] = []
        solution_data['verified'] = False

        solutions.update_status(solution_id, "analyzing", "Validation solution...")
        # Generate confidence score
        solution_data['confidence'] = await generate_confidence_score(solution_data)

        solutions.update_status(solution_id, "storing", "Finalizing...")
        # Store inventory data if available
        inventory_id = await store_model_info(solution_id, solution_data)
        if inventory_id:
            solution_data['inventory_id'] = inventory_id

        # Store question embedding
        embedding = embed_text(question)
        questions.create({
            'text': question,
            'solution_id': solution_id,
            'inventory_id': inventory_id,
            'embedding': embedding
        })

        # Update solution with all data
        solution_data['status'] = 'ready'
        solutions.update(solution_id, solution_data)

    except Exception as e:
        print(f"Error in process_research_report: {str(e)}")
        error_data = {
            'text': f"Error generating report: {str(e)}",
            'description': 'An error occurred while processing the solution.',
            'solution_steps': [],
            'error': True,
            'status': 'error'
        }
        solutions.update(solution_id, error_data)
        solutions.update_status(solution_id, "error", f"Error: {str(e)}")
